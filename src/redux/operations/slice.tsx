import { createSlice } from "@reduxjs/toolkit";
import { getAllOperations } from "./operations";

const initialState = {
  operations: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: typeof initialState) => {
  state.isLoading = true;
};

const handleFulfilled = (state: typeof initialState, action: any) => {
  state.operations = action.payload.data;
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state: typeof initialState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const OperationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOperations.fulfilled, handleFulfilled)
      .addCase(getAllOperations.pending, handlePending)
      .addCase(getAllOperations.rejected, handleRejected);
  },
});

export const operationsReducer = OperationsSlice.reducer;
