import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  updateUserAvatar,
  deleteAvatar,
} from "./operations";

const initialState = {
  user: {
    email: null,
    avatarURL: null,
    name: null,
  },
  token: null,
  isLoggedIn: false,
  isPending: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleFulfilled = (state: typeof initialState, action: any) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isPending = false;
      state.error = null;
    };

    const handlePending = (state: typeof initialState) => {
      state.isPending = true;
    };

    const handleRejected = (state: typeof initialState, action: any) => {
      state.error = action.payload.error;
      state.isPending = false;
    };

    builder
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(logout.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
          avatarURL: state.user.avatarURL,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.isPending = false;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, handleFulfilled)
      .addCase(deleteAvatar.fulfilled, handleFulfilled)
      .addCase(register.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logout.pending, handlePending)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(deleteAvatar.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logout.rejected, handleRejected)
      .addCase(updateUserAvatar.rejected, handleRejected)
      .addCase(deleteAvatar.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
