const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
const selectUser = (state: any) => state.auth.user;
const selectPending = (state: any) => state.auth.isPending;

export { selectIsLoggedIn, selectUser, selectPending };
