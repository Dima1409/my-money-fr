import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

const setAuthHeader = (token: string) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  API.defaults.headers.common.Authorization = "";
};

const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/register", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await API.post("/auth/login", credentials);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { register, login };
