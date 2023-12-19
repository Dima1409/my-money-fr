import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAll,
  createNewCategory,
  renameCategory,
  deleteCategory,
} from "./operations";

interface Category {
  id: string;
  name: string;
  type: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const handlePending = (state: CategoryState) => {
  state.isLoading = true;
};

const handleRejected = (state: CategoryState, action: any) => {
  state.isLoading = false;
  state.error = action.payload;
};

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, handlePending)
      .addCase(createNewCategory.pending, handlePending)
      .addCase(renameCategory.pending, handlePending)
      .addCase(deleteCategory.pending, handlePending)
      .addCase(getAll.rejected, handleRejected)
      .addCase(createNewCategory.rejected, handleRejected)
      .addCase(renameCategory.rejected, handleRejected)
      .addCase(deleteCategory.rejected, handleRejected)
      .addCase(
        getAll.fulfilled,
        (state: CategoryState, action: PayloadAction<Category[]>) => {
          state.isLoading = false;
          state.error = null;
          state.categories = action.payload;
        }
      )
      .addCase(
        createNewCategory.fulfilled,
        (state: CategoryState, action: PayloadAction<Category>) => {
          state.isLoading = false;
          state.error = null;
          state.categories.push(action.payload);
        }
      )
      .addCase(
        renameCategory.fulfilled,
        (state: CategoryState, action: PayloadAction<Category>) => {
          state.isLoading = false;
          state.error = null;
          state.categories = state.categories.map((category) => {
            if (category.id === action.payload.id) {
              category = action.payload;
            }
            return category;
          });
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state: CategoryState, action: PayloadAction<Category>) => {
          state.isLoading = false;
          state.error = null;
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.id
          );
          state.categories.splice(index, 1);
        }
      );
  },
});

export const categoriesReducer = CategoriesSlice.reducer;
