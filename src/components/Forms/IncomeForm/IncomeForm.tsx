import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form } from "./IncomeForm.styled";
import { incomeOperation, wallets, categories } from "service/api";
import { ISearchWallet, ISearchCategory } from "types/data";
import Loader from "components/Loader";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import WalletsList from "components/WalletsList";
import CategoryList from "components/CategoryList";

const initialState = {
  wallet: "",
  category: "",
  amount: "",
  type: "income",
  comment: "",
};

const IncomeForm: React.FC = () => {
  const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [categoryIncome, setCategoryIncome] = useState<
    ISearchCategory[] | undefined
  >();
  const [formData, setFormData] = useState(initialState);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const { isOpen, close, toggle } = useToggle();

  const getData = async () => {
    try {
      const totalWallets: ISearchWallet[] = await wallets();
      const totalCategoriesIncomes: ISearchCategory[] = await categories();
      const incomeCategories = totalCategoriesIncomes.filter(
        (category) => category.type === "income"
      );
      setCategoryIncome(incomeCategories);
      setWallet(totalWallets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
      await incomeOperation(formData);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {!wallet || !categoryIncome ? (
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
              {wallet?.map(({ _id, name }) => (
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
              {categoryIncome
                .filter((category) => category.type === "income")
                .map(({ _id, name }) => (
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
          {showWalletList && wallet && (
            <WalletsList wallets={wallet}></WalletsList>
          )}
          {showCategoryList && categoryIncome && (
            <CategoryList
              categories={categoryIncome}
              typeOfCategory="income"
            ></CategoryList>
          )}
        </Modal>
      )}
    </>
  );
};

export default IncomeForm;
