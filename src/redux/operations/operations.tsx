import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

const getAllOperations = createAsyncThunk("operations", async (_, thunkAPI) => {
  try {
    const response = await API.get("/operation");
    return response.data.data.result;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

interface operationsCredentials {
  amount: number;
  type: string;
  wallet: string;
  category: string;
  comment: string;
}

const incomeOperations = createAsyncThunk(
  "/operation/add",
  async (credentials: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.post("/operation/add", credentials);
      console.log("Add operation in operations", response);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const expensesOperation = createAsyncThunk(
  "/operation/sell",
  async (credentials: operationsCredentials, thunkAPI) => {
    try {
      const response = await API.post("operations/sell", credentials);
      console.log("Sell operation in operations", response);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllOperations, incomeOperations, expensesOperation };
