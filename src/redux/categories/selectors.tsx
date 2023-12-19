const selectCategories = (state: any) => state.categories.categories;
const selectLoading = (state: any) => state.categories.isLoading;
const selectError = (state: any) => state.categories.error;

export { selectCategories, selectLoading, selectError };
