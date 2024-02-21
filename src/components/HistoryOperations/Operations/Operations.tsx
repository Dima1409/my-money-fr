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
  HistorySelect,
  OperationInfo,
  OperationResult,
  TypeWrapper,
  BtnDelete,
  BtnEdit,
} from "./Operations.styled";
import Loader from "components/Loader";
import {
  DeleteIcon,
  EditIcon,
  IncomeIcon,
  ExpenseIcon,
  TransferIcon,
  DateIcon,
  TimeIcon,
  WalletIcon,
  CategoryIcon,
  AmountIcon,
  NoteIcon,
} from "components/Icons/Icons";
import { isToday, isYesterday } from "utils/dateTodayYesterday";
import Pagination from "components/pagination/Pagination";
import {
  SelectWrapperStyled,
  OptionStyled,
} from "components/Statistic/Statistics.styled";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 10;

interface OperationsProps {
  operationsType: ISearchOperation[];
}

const Operations: React.FC<OperationsProps> = ({ operationsType }) => {
  const [selectedOption, setSelectedOption] = useState("7days");

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

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (selectedOption) {
      dispatchTyped(getAllOperations());
    }
  }, [dispatchTyped, selectedOption]);

  const sortedOperations = [...operationsType]?.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredOperations =
    selectedOption === "all"
      ? sortedOperations
      : sortedOperations.filter((operation) => {
          const operationDate = new Date(operation.createdAt);
          if (selectedOption === "7days") {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return operationDate >= sevenDaysAgo;
          } else if (selectedOption === "month") {
            const firstDayOfMonth = new Date(
              operationDate.getFullYear(),
              operationDate.getMonth(),
              1
            );
            return operationDate >= firstDayOfMonth;
          } else if (selectedOption === "year") {
            const firstDayOfYear = new Date(operationDate.getFullYear(), 0, 1);
            return operationDate >= firstDayOfYear;
          }
          return true;
        });

  const currentOperations = filteredOperations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleDelete = async (id: any, type: string) => {
    setDeletingOperation(id);
    dispatchTyped(
      type ? deleteOperation(id) : deleteTransferOperation(id)
    ).then(() => {
      setDeletingOperation(null);
      dispatchTyped(getAllOperations());
      const updatedList = filteredOperations.filter(
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
      <SelectWrapperStyled>
        <HistorySelect value={selectedOption} onChange={handleOptionChange}>
          <OptionStyled value="7days">За 7 днів</OptionStyled>
          <OptionStyled value="month">За Місяць</OptionStyled>
          <OptionStyled value="year">За Рік</OptionStyled>
          <OptionStyled value="all">За весь період</OptionStyled>
        </HistorySelect>
      </SelectWrapperStyled>
      <Pagination
        totalItems={filteredOperations.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
      <OperationWrapper>
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
                <OperationInfo>
                  Дата:
                  <DateIcon color={theme.colors.accent} />
                  <OperationResult>
                    {date.getDate().toString().padStart(2, "0")}.
                    {(date.getMonth() + 1).toString().padStart(2, "0")}.
                    {date.getFullYear()}
                    {dateNote}
                  </OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Час:
                  <TimeIcon color={theme.colors.accent} />
                  <OperationResult>
                    {date.getHours().toString().padStart(2, "0")}:
                    {date.getMinutes().toString().padStart(2, "0")}:
                    {date.getSeconds().toString().padStart(2, "0")}
                  </OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Сума:
                  <AmountIcon color={theme.colors.accent} />{" "}
                  <OperationResult>{amount} грн</OperationResult>
                </OperationInfo>
                {type === "income" || type === "expense" ? (
                  <>
                    <OperationInfo>
                      Гаманець:
                      <WalletIcon color={theme.colors.accent} />
                      <OperationResult>{wallet}</OperationResult>
                    </OperationInfo>
                    <OperationInfo>
                      Категорія:
                      <CategoryIcon color={theme.colors.accent} />{" "}
                      <OperationResult>{category}</OperationResult>
                    </OperationInfo>
                    {comment && (
                      <OperationInfo>
                        Коментар:
                        <NoteIcon color={theme.colors.accent} />{" "}
                        <OperationResult>{comment}</OperationResult>
                      </OperationInfo>
                    )}
                  </>
                ) : (
                  <>
                    <OperationInfo>
                      З гаманця:
                      <WalletIcon color={theme.colors.darkRed} />{" "}
                      <OperationResult>{walletFrom}</OperationResult>
                    </OperationInfo>
                    <OperationInfo>
                      На гаманець:
                      <WalletIcon color={theme.colors.valid} />{" "}
                      <OperationResult>{walletTo}</OperationResult>
                    </OperationInfo>
                  </>
                )}
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
                <BtnEdit>
                  <EditIcon color={theme.colors.valid} />
                </BtnEdit>
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
