import { ISearchOperation } from "types/data";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
  deleteTransferOperation,
  editOperation,
  editOperationTransfer,
} from "../../../redux/operations/operations";
import { getAllWallets } from "../../../redux/wallets/operations";
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
  SelectLabel,
  SelectEdit,
  OptionEdit,
  InputEdit,
  BtnSubmit,
} from "./Operations.styled";
import Modal from "components/Modal";
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
import useToggle from "hooks/useToggle";
import { FormEdit } from "components/WalletsList/WalletsList.styled";
import useWallets from "hooks/useWallets";
import useCategory from "hooks/useCategory";
import { ISearchWallet, ISearchCategory } from "types/data";
import { amountPattern, commentPattern } from "utils/patterns";
import { ITEMS_PER_PAGE, initialState } from "../helpersOperations";

interface OperationsProps {
  operationsType: ISearchOperation[];
}

const Operations: React.FC<OperationsProps> = ({ operationsType }) => {
  const { wallets } = useWallets();
  const { categories } = useCategory();

  const [isCommentValid, setIsCommentValid] = useState(true);

  const [selectedOption, setSelectedOption] = useState("7days");

  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isOpen, close, toggle } = useToggle();
  const [formData, setFormData] = useState(initialState);
  const [deletingOperation, setDeletingOperation] = useState<string | null>(
    null
  );

  const [currentOperationType, setCurrentOperationType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const [initialFormData, setInitialFormData] = useState(initialState);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = e.target.value;
    setSelectedOption(newOption);
    setCurrentPage(1);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "walletFrom" && value === formData.walletTo) {
      setFormData((prevData) => ({
        ...prevData,
        walletTo: "",
      }));
    } else if (name === "walletTo" && value === formData.walletFrom) {
      setFormData((prevData) => ({
        ...prevData,
        walletFrom: "",
      }));
    }
    if (name === "comment") {
      const isValid = commentPattern.test(value);
      setIsCommentValid(isValid);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatchTyped(getAllWallets());
    if (selectedOption) {
      dispatchTyped(getAllOperations());
    }
  }, [dispatchTyped, selectedOption]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchTyped(
      currentOperationType
        ? editOperation({
            id: formData.id,
            wallet: formData.wallet,
            category: formData.category,
            amount: formData.amount,
            comment: formData.comment,
            type: formData.type,
          })
        : editOperationTransfer({
            id: formData.id,
            walletFrom: formData.walletFrom,
            walletTo: formData.walletTo,
            amount: formData.amount,
          })
    )
      .then(() => dispatchTyped(getAllOperations()))
      .finally(() => dispatchTyped(getAllWallets));
    close();
  };

  const startEditing = (id: string) => {
    const currentOperation = operationsType.find((elem) => elem._id === id);
    setCurrentOperationType(currentOperation?.type || "");
    setFormData({
      id: currentOperation?._id || "",
      wallet: currentOperation?.wallet || "",
      walletFrom: currentOperation?.walletFrom || "",
      walletTo: currentOperation?.walletTo || "",
      category: currentOperation?.category || "",
      amount: String(currentOperation?.amount) || "",
      comment: currentOperation?.comment || "",
      type: currentOperation?.type || "",
      createdAt: currentOperation?.createdAt || "",
      updatedAt: currentOperation?.updatedAt || "",
    });
    setInitialFormData({
      id: currentOperation?._id || "",
      wallet: currentOperation?.wallet || "",
      walletFrom: currentOperation?.walletFrom || "",
      walletTo: currentOperation?.walletTo || "",
      category: currentOperation?.category || "",
      amount: String(currentOperation?.amount) || "",
      comment: currentOperation?.comment || "",
      type: currentOperation?.type || "",
      createdAt: currentOperation?.createdAt || "",
      updatedAt: currentOperation?.updatedAt || "",
    });
  };

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
    const shouldDelete = window.confirm("Видалити запис?");
    if (shouldDelete) {
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
    }
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
            updatedAt,
            wallet,
            walletFrom,
            walletTo,
          }: ISearchOperation) => {
            const isDeleting = deletingOperation === _id;
            const dateCreate = new Date(createdAt);
            const dateUpdate = new Date(updatedAt);
            let dateNote = "";

            if (isToday(dateCreate)) {
              dateNote = " (сьогодні)";
            } else if (isYesterday(dateCreate)) {
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
                    {dateCreate.getDate().toString().padStart(2, "0")}.
                    {(dateCreate.getMonth() + 1).toString().padStart(2, "0")}.
                    {dateCreate.getFullYear()}
                    {dateNote}
                  </OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Час:
                  <TimeIcon color={theme.colors.accent} />
                  <OperationResult>
                    {dateCreate.getHours().toString().padStart(2, "0")}:
                    {dateCreate.getMinutes().toString().padStart(2, "0")}:
                    {dateCreate.getSeconds().toString().padStart(2, "0")}
                  </OperationResult>
                </OperationInfo>
                {createdAt !== updatedAt && (
                  <OperationInfo>
                    Змінено:
                    <DateIcon color={theme.colors.accent} />
                    <OperationResult>
                      {dateUpdate.getDate().toString().padStart(2, "0")}.
                      {(dateUpdate.getMonth() + 1).toString().padStart(2, "0")}.
                      {dateUpdate.getFullYear()}
                    </OperationResult>
                    в{" "}
                    <OperationResult>
                      {dateUpdate.getHours().toString().padStart(2, "0")}:
                      {dateUpdate.getMinutes().toString().padStart(2, "0")}:
                      {dateUpdate.getSeconds().toString().padStart(2, "0")}
                    </OperationResult>
                  </OperationInfo>
                )}
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
                <BtnEdit
                  onClick={() => {
                    startEditing(_id);
                    toggle();
                  }}
                >
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
      {isOpen && (
        <Modal
          onClick={() => {
            close();
          }}
        >
          <FormEdit onSubmit={handleSubmit} autoComplete="off">
            {!currentOperationType ? (
              <>
                <SelectLabel>
                  З гаманця
                  <SelectEdit
                    name="walletFrom"
                    value={formData.walletFrom}
                    onChange={handleInputChange}
                  >
                    <OptionEdit disabled value="">
                      гаманець
                    </OptionEdit>
                    {wallets?.map(({ _id, name }: ISearchWallet) => (
                      <OptionEdit
                        key={_id}
                        disabled={_id === formData.walletTo}
                      >
                        {name}
                      </OptionEdit>
                    ))}
                  </SelectEdit>
                </SelectLabel>
                <SelectLabel>
                  На гаманець
                  <SelectEdit
                    name="walletTo"
                    value={formData.walletTo}
                    onChange={handleInputChange}
                  >
                    <OptionEdit disabled value="">
                      гаманець
                    </OptionEdit>
                    {wallets?.map(({ _id, name }: ISearchWallet) => (
                      <OptionEdit
                        key={_id}
                        disabled={_id === formData.walletFrom}
                      >
                        {name}
                      </OptionEdit>
                    ))}
                  </SelectEdit>
                </SelectLabel>
                <SelectLabel>
                  Сума
                  <InputEdit
                    style={{ borderColor: "transparent" }}
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    pattern={amountPattern.source}
                  ></InputEdit>
                </SelectLabel>
                <BtnSubmit
                  disabled={
                    !amountPattern.test(formData.amount) ||
                    formData.amount === "" ||
                    formData.walletFrom === "" ||
                    formData.walletTo === "" ||
                    formData.walletFrom === formData.walletTo ||
                    JSON.stringify(formData) === JSON.stringify(initialFormData)
                  }
                  type="submit"
                >
                  змінити
                </BtnSubmit>
              </>
            ) : (
              <>
                <SelectLabel>
                  Гаманець
                  <SelectEdit
                    name="wallet"
                    value={formData.wallet}
                    onChange={handleInputChange}
                  >
                    {wallets?.map(({ _id, name }: ISearchWallet) => (
                      <OptionEdit key={_id}>{name}</OptionEdit>
                    ))}
                  </SelectEdit>
                </SelectLabel>
                <SelectLabel>
                  Сума
                  <InputEdit
                    style={{ borderColor: "transparent" }}
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    pattern={amountPattern.source}
                  ></InputEdit>
                </SelectLabel>
                <SelectLabel>
                  Категорія
                  <SelectEdit
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {categories?.map(({ _id, name, type }: ISearchCategory) =>
                      type === formData.type ? (
                        <OptionEdit key={_id}>{name}</OptionEdit>
                      ) : null
                    )}
                  </SelectEdit>
                </SelectLabel>
                <SelectLabel>
                  Коментар
                  <InputEdit
                    type="text"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    pattern={commentPattern.source}
                  ></InputEdit>
                </SelectLabel>
                <BtnSubmit
                  disabled={
                    !amountPattern.test(formData.amount) ||
                    formData.amount === "" ||
                    formData.category === "" ||
                    formData.wallet === "" ||
                    (!isCommentValid && formData.comment !== "") ||
                    JSON.stringify(formData) === JSON.stringify(initialFormData)
                  }
                  type="submit"
                >
                  змінити
                </BtnSubmit>
              </>
            )}
          </FormEdit>
        </Modal>
      )}
    </>
  );
};
export default Operations;
