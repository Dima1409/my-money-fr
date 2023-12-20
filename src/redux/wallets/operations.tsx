import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

interface Wallets {
  id: string;
  name: string;
  total: number;
  owner: string;
}

const getAllWallets = createAsyncThunk("/wallets", async (_, thunkAPI) => {
  try {
    const response = await API.get("/wallets");
    return response.data.data.result;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue(error.message);
  }
});

const createNewWallets = createAsyncThunk(
  "/wallets/new",
  async (credentials: Wallets, thunkAPI) => {
    try {
      const response = await API.post("/wallets/new", credentials);
      console.log("Create new wallet in operations", response);
      return response.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteWallet = createAsyncThunk(
  "/wallets/delete",
  async (credentials: Wallets, thunkAPI) => {
    try {
      const response = await API.delete(`/wallets/${credentials.id}`);
      console.log("Delete wallets in operations", response);
      return response.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const editWallet = createAsyncThunk(
  "/wallets/edit",
  async (credentials: Wallets, thunkAPI) => {
    try {
      const response = await API.patch(
        `/wallets/${credentials.id}`,
        credentials
      );
      console.log("Edit wallet in operations", response);
      return response.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllWallets, createNewWallets, deleteWallet, editWallet };
