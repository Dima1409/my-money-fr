import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

interface Category {
  id?: string;
  name: string;
  type?: string;
}

const getAll = createAsyncThunk("/categories", async (_, thunkAPI) => {
  try {
    const response = await API.get("/categories");
    return response.data.data.results;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue(error.message);
  }
});

const createNewCategory = createAsyncThunk(
  "/category",
  async (credentials: Category, thunkAPI) => {
    try {
      const response = await API.post("/categories", credentials);
      console.log("Create new category in operations", response);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const renameCategory = createAsyncThunk(
  "/category/rename",
  async (credentials: Category, thunkAPI) => {
    try {
      const response = await API.patch(`/categories/${credentials.id}`, {
        name: credentials.name,
      });
      console.log("Edit category in operations", response);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteCategory = createAsyncThunk(
  "/category/delete",
  async (credentials: Category, thunkAPI) => {
    try {
      const response = await API.delete(`/categories/${credentials}`);
      console.log("Delete category in operations", response);
      return response.data.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAll, createNewCategory, renameCategory, deleteCategory };
