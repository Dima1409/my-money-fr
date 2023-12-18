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

interface incomeCredentials {
  amount: number;
  type: string;
  wallet: string;
  category: string;
  comment: string;
}

const incomeOperations = createAsyncThunk(
  "/operations/add",
  async (credentials: incomeCredentials, thunkAPI) => {
    try {
      const response = await API.post("/operation/add", credentials);
      console.log("Add operation in operations", response);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { getAllOperations, incomeOperations };
