import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

interface operationsCredentials {
  id?: string;
  amount: string;
  type: string;
  wallet: string;
  category: string;
  comment: string;
}

const getAllOperations = createAsyncThunk("operation", async (_, thunkAPI) => {
  try {
    const response = await API.get("/operation");
    return response.data.data.result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const incomeOperations = createAsyncThunk(
  "/operation/add",
  async (credentials: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.post("/operation/add", credentials);
      return response.data.data.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const expensesOperation = createAsyncThunk(
  "/operation/sell",
  async (credentials: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.post("/operation/sell", credentials);
      return response.data.data.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteOperation = createAsyncThunk(
  "/operation/delete",
  async (id: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.delete(`/operation/${id}`);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export {
  getAllOperations,
  incomeOperations,
  expensesOperation,
  deleteOperation,
};
