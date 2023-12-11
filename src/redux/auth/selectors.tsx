const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
const selectUser = (state: any) => state.auth.user;
const selectPending = (state: any) => state.auth.isPending;
const refreshUser = (state: any) => state.auth.isRefreshing;

export { selectIsLoggedIn, selectUser, selectPending, refreshUser };
