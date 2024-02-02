import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

interface operationsCredentials {
  id?: string;
  amount: string;
  wallet?: string;
  category?: string;
  comment?: string;
  walletFrom?: string;
  walletTo?: string;
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

const transfersOperation = createAsyncThunk(
  "/operation/transfer",
  async (credentials: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.post("/operation/transfer", credentials);
      return response.data.data.result;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
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
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

const deleteTransferOperation = createAsyncThunk(
  "/operation//transfer/:id",
  async (id: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.delete(`/operation/transfer/${id}`);
      return response.data.data.result;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error);
    }
  }
);

export {
  getAllOperations,
  incomeOperations,
  expensesOperation,
  transfersOperation,
  deleteOperation,
  deleteTransferOperation,
};
