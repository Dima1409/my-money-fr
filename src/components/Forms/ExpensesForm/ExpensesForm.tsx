import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form } from "../IncomeForm/IncomeForm.styled";

import { ISearchWallet, ISearchCategory } from "types/data";
import Loader from "components/Loader";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import WalletsList from "components/WalletsList";
import CategoryList from "components/CategoryList";

import useOperations from "hooks/useOperations";
import useWallets from "hooks/useWallets";
import useCategory from "hooks/useCategory";

import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAll } from "../../../redux/categories/operations";
import { expensesOperation } from "../../../redux/operations/operations";

const initialState = {
  wallet: "",
  category: "",
  amount: "",
  type: "expense",
  comment: "",
};

const ExpenseForm: React.FC = () => {
  const { isLoading, isError } = useOperations();
  const {
    isError: walletError,
    isLoading: walletLoading,
    wallets,
  } = useWallets();
  const {
    categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategory();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();

  const [formData, setFormData] = useState(initialState);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const { isOpen, close, toggle } = useToggle();

  useEffect(() => {
    dispatchTyped(getAll());
  }, [dispatchTyped]);

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatchTyped(expensesOperation(formData));
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {isLoading || walletLoading || categoriesLoading ? (
          <Loader type="spin" color="teal"></Loader>
        ) : (
          <>
            <div>Гаманець</div>
            <select
              name="wallet"
              onChange={handleInputChange}
              value={formData.wallet}
            >
              <option value="" disabled>
                Оберіть гаманець
              </option>
              {wallets?.map(({ _id, name }: ISearchWallet) => (
                <option key={_id}>{name}</option>
              ))}
            </select>
            <button
              style={{ marginLeft: "12px" }}
              type="button"
              onClick={() => {
                setShowWalletList(true);
                toggle();
              }}
            >
              edit
            </button>
            <div>Категорія</div>
            <select
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            >
              <option value="" disabled>
                Оберіть категорію
              </option>
              {categories
                .filter(
                  (category: ISearchCategory) => category.type === "expense"
                )
                .map(({ _id, name }: ISearchCategory) => (
                  <option key={_id} value={name}>
                    {name}
                  </option>
                ))}
            </select>
            <button
              style={{ marginLeft: "12px" }}
              type="button"
              onClick={() => {
                setShowCategoryList(true);
                toggle();
              }}
            >
              edit
            </button>
            <div>Коментар</div>
            <input
              type="text"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
            ></input>
            <div>Сума</div>
            <input
              type="number"
              name="amount"
              placeholder="0"
              value={formData.amount}
              onChange={handleInputChange}
            ></input>
            <button
              type="submit"
              disabled={
                formData.amount === "" ||
                formData.category === "" ||
                formData.wallet === ""
              }
            >
              ok
            </button>
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
              typeOfCategory="expense"
            ></CategoryList>
          )}
        </Modal>
      )}
    </>
  );
};

export default ExpenseForm;
