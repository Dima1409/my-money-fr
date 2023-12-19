const selectWallets = (state: any) => state.wallets.wallets;
const selectLoading = (state: any) => state.wallets.isLoading;
const selectError = (state: any) => state.wallets.error;
export { selectWallets, selectLoading, selectError };
