const selectOperations = (state: any) => state.operations.operations;
const selectLoading = (state: any) => state.operations.isLoading;
const selectError = (state: any) => state.operations.error;
export { selectOperations, selectLoading, selectError };
