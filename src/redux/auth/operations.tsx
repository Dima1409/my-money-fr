import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";
import axios from "axios";

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

const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await API.get("/auth/logout");
    clearAuthHeader();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const deleteAvatar = createAsyncThunk(
  "auth/deleteAvatar",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.token;

    if (token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(token);
      const response = await axios.get("/auth/deleteAvatar");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const updateUserAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async ({ value }: { value: any }, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = state.auth.token;
    if (token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(token);
      const config = {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await API.patch("/auth/updateAvatar", value, config);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { register, login, logout, deleteAvatar, updateUserAvatar };
