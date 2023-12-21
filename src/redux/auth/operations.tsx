import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "Services/AxiosConfig";

const setAuthHeader = (token: string) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  API.defaults.headers.common.Authorization = "";
};

interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
}

const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterCredentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/register", credentials);
      setAuthHeader(response.data.data.user);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface LoginCredentials {
  email: string;
  password: string;
}

const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, thunkAPI) => {
    try {
      const response = await API.post("/auth/login", credentials);
      setAuthHeader(response.data.data.user);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
      const response = await API.get("/auth/deleteAvatar");
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

const refreshUser = createAsyncThunk("/auth/current", async (_, thunkAPI) => {
  const state: any = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }
  try {
    setAuthHeader(persistedToken);
    const response = await API.get("/auth/current");
    return response.data.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export { register, login, logout, deleteAvatar, updateUserAvatar, refreshUser };
