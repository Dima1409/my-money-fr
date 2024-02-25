import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getAllOperations,
  deleteOperation,
  deleteTransferOperation,
  editOperation,
} from "../../../redux/operations/operations";
import { getAllWallets } from "../../../redux/wallets/operations";
import { getAll } from "../../../redux/categories/operations";
import useOperations from "hooks/useOperations";
import useAuth from "../../../hooks/useAuth";
import Loader from "components/Loader";
import { ISearchOperation, ISearchWallet, ISearchCategory } from "types/data";
import {
  OperationWrapper,
  Operation,
  HistorySelect,
  TypeWrapper,
  OperationInfo,
  OperationResult,
  BtnDelete,
  BtnEdit,
  SelectLabel,
  SelectEdit,
  OptionEdit,
  InputEdit,
  BtnSubmit,
} from "../Operations/Operations.styled";
import {
  DeleteIcon,
  IncomeIcon,
  ExpenseIcon,
  TransferIcon,
  DateIcon,
  TimeIcon,
  WalletIcon,
  CategoryIcon,
  AmountIcon,
  NoteIcon,
  EditIcon,
} from "components/Icons/Icons";
import { theme } from "theme/theme";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import getBackgroundColor from "../Operations/getBgColor";
import { isToday, isYesterday } from "utils/dateTodayYesterday";
import Pagination from "components/pagination/Pagination";
import ButtonToTop from "components/ButtonToTop";
import {
  SelectWrapperStyled,
  OptionStyled,
} from "components/Statistic/Statistics.styled";
import { FormEdit } from "components/WalletsList/WalletsList.styled";
import useWallets from "hooks/useWallets";
import useCategory from "hooks/useCategory";

const ITEMS_PER_PAGE = 10;

const initialState = {
  id: "",
  wallet: "",
  category: "",
  amount: "",
  comment: "",
  type: "",
  updatedAt: "",
};

const HistoryOperations: React.FC = () => {
  const { operations } = useOperations();
  const { wallets } = useWallets();
  const { categories } = useCategory();
  const { isLoggedIn } = useAuth();

  const [selectedOption, setSelectedOption] = useState("7days");
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isOpen, close, toggle } = useToggle();
  const [formData, setFormData] = useState(initialState);
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

  const handleInputChange = async (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatchTyped(getAll());
    if (selectedOption) {
      dispatchTyped(getAllOperations());
    }
  }, [dispatchTyped, selectedOption]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchTyped(
      editOperation({
        id: formData.id,
        wallet: formData.wallet,
        category: formData.category,
        amount: formData.amount,
        comment: formData.comment,
        type: formData.type,
      })
    )
      .then(() => dispatchTyped(getAllOperations()))
      .finally(() => dispatchTyped(getAllWallets()));
    close();
  };

  const startEditing = (id: string) => {
    const currentOperation = operations.find((elem) => elem._id === id);
    setFormData({
      id: currentOperation?._id || "",
      wallet: currentOperation?.wallet || "",
      category: currentOperation?.category || "",
      amount: String(currentOperation?.amount) || "",
      comment: currentOperation?.comment || "",
      type: currentOperation?.type || "",
      updatedAt: currentOperation?.updatedAt || "",
    });
  };

  const sortedOperations = [...operations]?.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const filteredOperations =
    selectedOption === "all"
      ? sortedOperations
      : sortedOperations.filter((operation) => {
          const operationDate = new Date(operation.updatedAt);
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
      <OperationWrapper>
        <SelectWrapperStyled>
          <HistorySelect value={selectedOption} onChange={handleOptionChange}>
            <OptionStyled value="7days">За 7 днів</OptionStyled>
            <OptionStyled value="month">За Місяць</OptionStyled>
            <OptionStyled value="year">За Рік</OptionStyled>
            <OptionStyled value="all">За весь період</OptionStyled>
          </HistorySelect>
        </SelectWrapperStyled>

        <ButtonToTop></ButtonToTop>
        <Pagination
          totalItems={filteredOperations.length}
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
              updatedAt,
              wallet,
              walletFrom,
              walletTo,
            }: ISearchOperation) => {
              const isDeleting = deletingOperation === _id;
              const date = new Date(updatedAt);
              let dateNote = "";

              if (isToday(date)) {
                dateNote = " (сьогодні)";
              } else if (isYesterday(date)) {
                dateNote = " (вчора)";
              }
              return (
                <>
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
                </>
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
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
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
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
              ></InputEdit>
            </SelectLabel>
            <SelectLabel>
              Дата
              <InputEdit
                type="date"
                name="updatedAt"
                value={`${new Date(formData.updatedAt)
                  .getFullYear()
                  .toString()}-${(new Date(formData.updatedAt).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${new Date(formData.updatedAt)
                  .getDate()
                  .toString()
                  .padStart(2, "0")}`}
                onChange={handleInputChange}
              ></InputEdit>
            </SelectLabel>
            <BtnSubmit type="submit">ok</BtnSubmit>
          </FormEdit>
        </Modal>
      )}
    </>
  );
};
export default HistoryOperations;
