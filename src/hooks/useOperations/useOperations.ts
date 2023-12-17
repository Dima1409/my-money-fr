import { useSelector } from "react-redux";
import {
  selectOperations,
  selectLoading,
  selectError,
} from "redux/operations/selectors";

const useOperationsSelectors = () => {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const operations = useSelector(selectOperations);

  return {
    isLoading,
    isError,
    operations,
  };
};

export default useOperationsSelectors;
