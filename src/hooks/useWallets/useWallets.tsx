import { useSelector } from "react-redux";
import {
  selectWallets,
  selectLoading,
  selectError,
} from "../../redux/wallets/selectors";

const useWalletsSelectors = () => {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const wallets = useSelector(selectWallets);

  return {
    isLoading,
    isError,
    wallets,
  };
};

export default useWalletsSelectors;
