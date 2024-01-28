import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import { getAllWallets } from "../../../redux/wallets/operations";
import useOperations from "hooks/useOperations";
import useAuth from "../../../hooks/useAuth";
import Loader from "components/Loader";
import { ISearchOperation } from "types/data";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  OperationResult,
  BtnDelete,
} from "../Operations/Operations.styled";
import { theme } from "theme/theme";
import { IconType } from "react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { isToday, isYesterday } from "utils/dateTodayYesterday";
import Pagination from "components/pagination/Pagination";

const ITEMS_PER_PAGE = 10;

interface CustomIconProps {
  icon: IconType;
  size?: string;
  color?: string;
}
const CustomIcon: React.FC<CustomIconProps> = ({
  icon: Icon,
  size = window.devicePixelRatio > 1 ? "80" : "20",
  color = `${theme.colors.accent}`,
}) => {
  return <Icon size={size} color={color} />;
};

export const DeleteIcon: React.FC<{ size?: string; color?: string }> = ({
  size,
  color,
}) => <CustomIcon icon={RiDeleteBinLine} size={size} color={color} />;

const HistoryOperations: React.FC = () => {
  const { operations } = useOperations();
  const { isLoggedIn } = useAuth();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [deletingOperation, setDeletingOperation] = useState<string | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatchTyped(getAllOperations());
  }, [dispatchTyped]);

  const sortedOperations = [...operations]?.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const currentOperations = sortedOperations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleDelete = async (id: any) => {
    setDeletingOperation(id);
    dispatchTyped(deleteOperation(id)).then(() => {
      setDeletingOperation(null);
      dispatchTyped(getAllOperations());
      dispatchTyped(getAllWallets());
      const updatedList = operations.filter(
        (operation) => operation._id !== id
      );
      const totalPages = Math.ceil(updatedList.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    });
  };

  return (
    <OperationWrapper>
      <Pagination
        totalItems={operations.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
      {isLoggedIn &&
        currentOperations &&
        currentOperations.map(
          ({
            _id,
            amount,
            type,
            category,
            comment,
            createdAt,
            wallet,
          }: ISearchOperation) => {
            const isDeleting = deletingOperation === _id;
            const date = new Date(createdAt);
            let dateNote = "";

            if (isToday(date)) {
              dateNote = " (сьогодні)";
            } else if (isYesterday(date)) {
              dateNote = " (вчора)";
            }
            return (
              <Operation
                key={_id}
                style={{
                  backgroundColor:
                    type === "income"
                      ? `${theme.colors.green}`
                      : `${theme.colors.red}`,
                }}
                className={isDeleting ? "deleting" : ""}
              >
                <OperationInfo>
                  Гаманець:{" "}
                  <OperationResult>{wallet.toUpperCase()}</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Сума: <OperationResult>{amount} грн</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Категорія: <OperationResult>{category}</OperationResult>
                </OperationInfo>
                {comment && (
                  <OperationInfo>
                    Коментар: <OperationResult>{comment}</OperationResult>
                  </OperationInfo>
                )}
                <OperationInfo>
                  Дата:{" "}
                  <OperationResult>
                    {date.getDate().toString().padStart(2, "0")}.
                    {date.getMonth().toString().padStart(1, "0") + 1}.
                    {date.getFullYear()}
                    {dateNote}
                  </OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Час:{" "}
                  <OperationResult>
                    {date.getHours().toString().padStart(2, "0")}:
                    {date.getMinutes().toString().padStart(2, "0")}:
                    {date.getSeconds().toString().padStart(2, "0")}
                  </OperationResult>
                </OperationInfo>
                <BtnDelete
                  onClick={() => handleDelete(_id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader type="spin" width="30px" height="30px" />
                  ) : (
                    <DeleteIcon color={theme.colors.accent}></DeleteIcon>
                  )}
                </BtnDelete>
              </Operation>
            );
          }
        )}
    </OperationWrapper>
  );
};
export default HistoryOperations;
