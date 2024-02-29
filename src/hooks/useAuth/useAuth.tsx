import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  refreshUser,
  selectPending,
} from "../../redux/auth/selectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(refreshUser);
  const isPending = useSelector(selectPending);
  return {
    isLoggedIn,
    user,
    isRefreshing,
    isPending,
  };
};

export default useAuth;
