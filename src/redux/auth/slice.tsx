import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  logout,
  editUser,
  updateUserAvatar,
  deleteAvatar,
  refreshUser,
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
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const handleFulfilled = (state: typeof initialState, action: any) => {
      state.user.email = action.payload.user.loginUser.email;
      state.user.name = action.payload.user.loginUser.name;
      state.user.avatarURL = action.payload.user.loginUser.avatarURL;
      state.token = action.payload.user.userToken;
      state.isLoggedIn = true;
      state.isPending = false;
      state.isRefreshing = false;
      state.error = null;
    };

    const handlePending = (state: typeof initialState) => {
      state.isPending = true;
      state.isRefreshing = true;
    };

    const handleRejected = (state: typeof initialState, action: any) => {
      state.error = action.payload.error;
      state.isPending = false;
      state.isRefreshing = false;
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
        state.isRefreshing = false;
        state.isPending = false;
        state.error = null;
      })
      .addCase(
        editUser.fulfilled,
        (state: typeof initialState, action: any) => {
          state.user.email = action.payload.email;
          state.user.name = action.payload.name;
          state.isLoggedIn = true;
          state.isPending = false;
          state.isRefreshing = false;
          state.error = null;
        }
      )
      .addCase(updateUserAvatar.fulfilled, handleFulfilled)
      .addCase(deleteAvatar.fulfilled, handleFulfilled)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.user.avatarURL = action.payload.avatarURL;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isPending = false;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(register.pending, handlePending)
      .addCase(login.pending, handlePending)
      .addCase(logout.pending, handlePending)
      .addCase(editUser.pending, handlePending)
      .addCase(updateUserAvatar.pending, handlePending)
      .addCase(deleteAvatar.pending, handlePending)
      .addCase(refreshUser.pending, handlePending)
      .addCase(register.rejected, handleRejected)
      .addCase(login.rejected, handleRejected)
      .addCase(logout.rejected, handleRejected)
      .addCase(editUser.rejected, handleRejected)
      .addCase(updateUserAvatar.rejected, handleRejected)
      .addCase(deleteAvatar.rejected, handleRejected)
      .addCase(refreshUser.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
