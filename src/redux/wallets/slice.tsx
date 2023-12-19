import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllWallets,
  createNewWallets,
  editWallet,
  deleteWallet,
} from "./operations";

interface Wallets {
  id: string;
  name: string;
  total: number;
  owner: string;
}

interface WalletsState {
  wallets: Wallets[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WalletsState = {
  wallets: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: WalletsState) => {
  state.isLoading = true;
};
const handleRejected = (state: WalletsState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const WalletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWallets.pending, handlePending)
      .addCase(createNewWallets.pending, handlePending)
      .addCase(editWallet.pending, handlePending)
      .addCase(deleteWallet.pending, handlePending)
      .addCase(getAllWallets.rejected, handleRejected)
      .addCase(createNewWallets.rejected, handleRejected)
      .addCase(editWallet.rejected, handleRejected)
      .addCase(deleteWallet.rejected, handleRejected)
      .addCase(
        getAllWallets.fulfilled,
        (state: WalletsState, action: PayloadAction<Wallets[]>) => {
          state.isLoading = false;
          state.error = null;
          state.wallets = action.payload;
        }
      )
      .addCase(
        createNewWallets.fulfilled,
        (state: WalletsState, action: PayloadAction<Wallets>) => {
          state.isLoading = false;
          state.error = null;
          state.wallets.push(action.payload);
        }
      )
      .addCase(
        deleteWallet.fulfilled,
        (state: WalletsState, action: PayloadAction<Wallets>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.wallets.findIndex(
            (wallet) => wallet.id === action.payload.id
          );
          state.wallets.splice(index, 1);
        }
      )
      .addCase(
        editWallet.fulfilled,
        (state: WalletsState, action: PayloadAction<Wallets>) => {
          state.isLoading = false;
          state.error = null;
          state.wallets = state.wallets.map((elem) => {
            if (elem.id === action.payload.id) {
              elem = action.payload;
            }
            return elem;
          });
        }
      );
  },
});

export const walletsReducer = WalletsSlice.reducer;
