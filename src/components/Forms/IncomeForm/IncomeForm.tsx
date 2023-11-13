import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form } from "./IncomeForm.styled";
import { incomeOperation, wallets, categories } from "services/api";
import { ISearchWallet, ISearchCategoryAdd } from "types/data";
import Loader from "components/Loader";

const initialState = {
  wallet: "",
  category: "",
  amount: "",
  type: true,
  comment: "",
};

const IncomeForm: React.FC = () => {
  const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [category, setCategory] = useState<ISearchCategoryAdd[] | undefined>();
  const [formData, setFormData] = useState(initialState);

  const getData = async () => {
    try {
      const totalWallets: ISearchWallet[] = await wallets();
      const totalCategories: ISearchCategoryAdd[] = await categories();
      setCategory(totalCategories);
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
        {!wallet || !category ? (
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
              type="button"
              onClick={() => console.log("Створити гаманець")}
            >
              +
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
              {category?.[0]?.add.map(({ _id, name }) => (
                <option key={_id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => console.log("Створити категорію")}
            >
              +
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
    </>
  );
};

export default IncomeForm;
