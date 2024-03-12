import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

interface Wallets {
  id?: string;
  name?: string;
  total?: string;
}

const getAllWallets = createAsyncThunk("wallets", async (_, thunkAPI) => {
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
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteWallet = createAsyncThunk(
  "/wallets/delete",
  async (credentials: Wallets, thunkAPI) => {
    try {
      const response = await API.delete(`/wallets/${credentials}`);
      return response.data.data;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

const editWallet = createAsyncThunk(
  "/wallets/edit",
  async (credentials: Wallets, thunkAPI) => {
    try {
      const response = await API.patch(`/wallets/${credentials.id}`, {
        name: credentials.name,
      });
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const editWalletTotal = createAsyncThunk(
  "/wallets/edit-total",
  async (credentials: Wallets, thunkAPI) => {
    try {
      const response = await API.put(`/wallets/${credentials.id}`, {
        total: credentials.total,
      });
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  getAllWallets,
  createNewWallets,
  deleteWallet,
  editWallet,
  editWalletTotal,
};
