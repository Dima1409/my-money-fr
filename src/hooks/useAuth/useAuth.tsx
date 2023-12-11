import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
  refreshUser,
} from "../../redux/auth/selectors";

const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(refreshUser);
  return {
    isLoggedIn,
    user,
    isRefreshing,
  };
};

export default useAuth;
