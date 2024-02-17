import { ISearchOperation } from "types/data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
  deleteTransferOperation,
} from "../../../redux/operations/operations";
import { theme } from "theme/theme";
import getBackgroundColor from "./getBgColor";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  OperationResult,
  TypeWrapper,
  BtnDelete,
} from "./Operations.styled";
import Loader from "components/Loader";
import {
  DeleteIcon,
  IncomeIcon,
  ExpenseIcon,
  TransferIcon,
} from "components/Icons/Icons";
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

  const handleDelete = async (id: any, type: string) => {
    setDeletingOperation(id);

    dispatchTyped(
      type ? deleteOperation(id) : deleteTransferOperation(id)
    ).then(() => {
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
            walletFrom,
            walletTo,
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
                  backgroundColor: getBackgroundColor(type),
                }}
                className={isDeleting ? "deleting" : ""}
              >
                {type === "income" || type === "expense" ? (
                  <>
                    <OperationInfo>
                      Гаманець: <OperationResult>{wallet}</OperationResult>
                    </OperationInfo>
                    <OperationInfo>
                      Категорія: <OperationResult>{category}</OperationResult>
                    </OperationInfo>
                    {comment && (
                      <OperationInfo>
                        Коментар: <OperationResult>{comment}</OperationResult>
                      </OperationInfo>
                    )}
                  </>
                ) : (
                  <>
                    <OperationInfo>
                      З гаманця: <OperationResult>{walletFrom}</OperationResult>
                    </OperationInfo>
                    <OperationInfo>
                      На гаманець: <OperationResult>{walletTo}</OperationResult>
                    </OperationInfo>
                  </>
                )}
                <OperationInfo>
                  Сума: <OperationResult>{amount} грн</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Дата:{" "}
                  <OperationResult>
                    {date.getDate().toString().padStart(2, "0")}.
                    {(date.getMonth() + 1).toString().padStart(2, "0")}.
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
                  onClick={() => handleDelete(_id, type)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader type="spin" width="30px" height="30px" />
                  ) : (
                    <DeleteIcon color={theme.colors.darkRed} />
                  )}
                </BtnDelete>
                <TypeWrapper>
                  {type === "income" && (
                    <IncomeIcon color={theme.colors.valid} />
                  )}
                  {type === "expense" && (
                    <ExpenseIcon color={theme.colors.invalid} />
                  )}
                  {!type && <TransferIcon color={theme.colors.accent} />}
                </TypeWrapper>
              </Operation>
            );
          }
        )}
      </OperationWrapper>
    </>
  );
};
export default Operations;
