import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllOperations, incomeOperations } from "./operations";

interface Operation {
  amount: number;
  type: string;
  wallet: string;
  category: string;
  comment: string;
}

interface OperationsState {
  operations: Operation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OperationsState = {
  operations: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: OperationsState) => {
  state.isLoading = true;
};

// const handleFulfilled = (state: OperationsState, action: any) => {
//   state.operations = action.payload;
//   state.isLoading = false;
//   state.error = null;
// };

const handleRejected = (state: OperationsState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const OperationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllOperations.fulfilled,
        (state: OperationsState, action: PayloadAction<Operation[]>) => {
          state.isLoading = false;
          state.error = null;
          state.operations = action.payload;
        }
      )
      .addCase(
        incomeOperations.fulfilled,
        (state: OperationsState, action: PayloadAction<Operation>) => {
          state.isLoading = false;
          state.error = null;
          state.operations.push(action.payload);
        }
      )
      .addCase(getAllOperations.pending, handlePending)
      .addCase(incomeOperations.pending, handlePending)
      .addCase(getAllOperations.rejected, handleRejected)
      .addCase(incomeOperations.rejected, handleRejected);
  },
});

export const operationsReducer = OperationsSlice.reducer;
