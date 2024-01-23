import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Form,
  SelectWrapper,
  Select,
  ButtonEdit,
  Option,
  Input,
  ButtonsWrapper,
  ButtonSubmit,
} from "./IncomeForm.styled";
import { ISearchWallet, ISearchCategory } from "types/data";
import Loader from "components/Loader";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import WalletsList from "components/WalletsList";
import CategoryList from "components/CategoryList";
import useWallets from "hooks/useWallets";
import useCategory from "hooks/useCategory";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAll } from "../../../redux/categories/operations";
import { incomeOperations } from "../../../redux/operations/operations";
import {
  IconEdit,
  IconOk,
  IconClose,
} from "components/WalletsList/WalletsList.styled";
import { theme } from "theme/theme";
import { commentPattern } from "utils/patterns";

const initialState = {
  wallet: "",
  category: "",
  amount: "",
  type: "income",
  comment: "",
};

const IncomeForm: React.FC = () => {
  const { isLoading: walletLoading, wallets } = useWallets();
  const { categories, isLoading: categoriesLoading } = useCategory();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState(initialState);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const { isOpen, close, toggle } = useToggle();
  const [isCommentValid, setIsCommentValid] = useState(true);

  useEffect(() => {
    dispatchTyped(getAll());
  }, [dispatchTyped]);

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "comment") {
      const isValid = commentPattern.test(value);
      setIsCommentValid(isValid);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatchTyped(incomeOperations(formData));
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setFormData(initialState);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} autoComplete="off">
        {walletLoading || categoriesLoading ? (
          <Loader type="spin"></Loader>
        ) : (
          <>
            <SelectWrapper>
              <Select
                name="wallet"
                onChange={handleInputChange}
                value={formData.wallet}
              >
                <Option value="" disabled>
                  Гаманець
                </Option>
                {wallets?.map(({ _id, name }: ISearchWallet) => (
                  <Option key={_id}>{name}</Option>
                ))}
              </Select>
              <ButtonEdit
                type="button"
                onClick={() => {
                  setShowWalletList(true);
                  toggle();
                }}
              >
                <IconEdit style={{ color: theme.colors.light }} />
              </ButtonEdit>
            </SelectWrapper>
            <SelectWrapper>
              <Select
                name="category"
                onChange={handleInputChange}
                value={formData.category}
              >
                <Option value="" disabled>
                  Категорія
                </Option>
                {categories
                  .filter(
                    (category: ISearchCategory) => category.type === "income"
                  )
                  .map(({ _id, name }: ISearchCategory) => (
                    <Option key={_id} value={name}>
                      {name}
                    </Option>
                  ))}
              </Select>
              <ButtonEdit
                type="button"
                onClick={() => {
                  setShowCategoryList(true);
                  toggle();
                }}
              >
                <IconEdit style={{ color: theme.colors.light }} />
              </ButtonEdit>
            </SelectWrapper>
            <SelectWrapper>
              <Input
                type="text"
                name="comment"
                placeholder="* Коментар"
                value={formData.comment}
                onChange={handleInputChange}
                pattern={commentPattern.source}
              ></Input>
            </SelectWrapper>
            <SelectWrapper>
              <Input
                type="number"
                name="amount"
                placeholder="Сума"
                value={formData.amount}
                onChange={handleInputChange}
              ></Input>
            </SelectWrapper>
            <ButtonsWrapper>
              <ButtonSubmit
                type="submit"
                disabled={
                  formData.amount === "" ||
                  formData.category === "" ||
                  formData.wallet === "" ||
                  !isCommentValid
                }
              >
                <IconOk style={{ color: theme.colors.light }} />
              </ButtonSubmit>
              <ButtonSubmit
                type="button"
                disabled={
                  formData.amount === "" &&
                  formData.category === "" &&
                  formData.wallet === "" &&
                  formData.comment === ""
                }
                onClick={() => clearForm()}
                style={{ backgroundColor: theme.colors.red }}
              >
                <IconClose style={{ color: theme.colors.dark }} />
              </ButtonSubmit>
            </ButtonsWrapper>
          </>
        )}
      </Form>
      {isOpen && (
        <Modal
          onClick={() => {
            setShowWalletList(false);
            setShowCategoryList(false);
            close();
          }}
        >
          {showWalletList && wallets && (
            <WalletsList wallets={wallets}></WalletsList>
          )}
          {showCategoryList && categories && (
            <CategoryList
              categories={categories}
              typeOfCategory="income"
            ></CategoryList>
          )}
        </Modal>
      )}
    </>
  );
};

export default IncomeForm;
