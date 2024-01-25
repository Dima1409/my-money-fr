import { ISearchOperation } from "types/data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import { theme } from "theme/theme";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  OperationResult,
  BtnDelete,
} from "./Operations.styled";
import Loader from "components/Loader";
import { CustomIcon } from "../AllOperations/AllOperations";
import { RiDeleteBinLine } from "react-icons/ri";
import { isToday, isYesterday } from "utils/dateTodayYesterday";
import Pagination from "components/pagination/Pagination";

const ITEMS_PER_PAGE = 10;

interface OperationsProps {
  operationsType: ISearchOperation[];
}

const Operations: React.FC<OperationsProps> = ({ operationsType }) => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [deletingOperation, setDeletingOperation] = useState<string | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentOperations = operationsType.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: any) => {
    setDeletingOperation(id);
    dispatchTyped(deleteOperation(id)).then(() => {
      setDeletingOperation(null);
      dispatchTyped(getAllOperations());
      const updatedList = operationsType.filter(
        (operation) => operation._id !== id
      );
      const totalPages = Math.ceil(updatedList.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    });
  };

  return (
    <>
      <OperationWrapper>
        <>
          <Pagination
            totalItems={operationsType.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
        {currentOperations.map(
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
                    <CustomIcon icon={RiDeleteBinLine}></CustomIcon>
                  )}
                </BtnDelete>
              </Operation>
            );
          }
        )}
      </OperationWrapper>
    </>
  );
};
export default Operations;
