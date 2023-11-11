import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form } from "../IncomeForm/IncomeForm.styled";
import { addOperation, wallets, categories } from "services/api";
import { ISearchWallet, ISearchCategorySell } from "types/data";
import Loader from "components/Loader";

const initialState = {
  wallet: "",
  category: "",
  amount: 0,
  type: false,
};

const IncomeForm: React.FC = () => {
  const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [category, setCategory] = useState<ISearchCategorySell[] | undefined>();
  const [formData, setFormData] = useState(initialState);

  const getData = async () => {
    try {
      const totalWallets: ISearchWallet[] = await wallets();
      const totalCategories: ISearchCategorySell[] = await categories();
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
      await addOperation(formData);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {(!wallet || !category) && <Loader type="spin" color="teal"></Loader>}
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
        <div>Категорія</div>
        <select
          name="category"
          onChange={handleInputChange}
          value={formData.category}
        >
          <option value="" disabled>
            Оберіть категорію
          </option>
          {category?.[1]?.sell.map(({ _id, name }) => (
            <option key={_id} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div>Сума</div>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        ></input>
        <button
          type="submit"
          disabled={
            formData.amount <= 0 ||
            formData.category === "" ||
            formData.wallet === ""
          }
        >
          ok
        </button>
      </Form>
    </>
  );
};

export default IncomeForm;
