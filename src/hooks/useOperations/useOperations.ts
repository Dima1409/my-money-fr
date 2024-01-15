import { useSelector } from "react-redux";
import {
  selectOperations,
  selectLoading,
  selectError,
} from "../../redux/operations/selectors";
import { ISearchOperation } from "types/data";

const useOperationsSelectors = () => {
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const operations: ISearchOperation[] = useSelector(selectOperations);

  return {
    isLoading,
    isError,
    operations,
  };
};

export default useOperationsSelectors;
