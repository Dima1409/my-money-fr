import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";


const getAllOperations = createAsyncThunk("operations", async (_, thunkAPI) => {
  try {
    const response = await API.get("/operations");
    console.log("All Operations", response.data);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { getAllOperations };
