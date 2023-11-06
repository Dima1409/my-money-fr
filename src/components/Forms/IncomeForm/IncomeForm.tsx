import { Form } from "./IncomeForm.styled";
import { addOperation, operations } from "services/api";
import { wallets, categories } from "services/api";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  ISearchWallet,
  ISearchCategoryAdd,
  ISearchOperation,
} from "types/data";
import Loader from "components/Loader";
// import Keyboard from "components/Keyboard";

const IncomeForm: React.FC = () => {
  const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [operation, setOperation] = useState<ISearchOperation[] | undefined>();
  const [category, setCategory] = useState<ISearchCategoryAdd[] | undefined>();
  const [formData, setFormData] = useState({
    wallet: wallet ? wallet[0].name : "",
    category: category ? category[0].add[0].name : "",
    amount: "",
    type: true,
  });
  useEffect(() => {
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
    getData();
  }, [operation]);
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
      const operationsIncome: ISearchOperation[] = await operations();
      const result = operationsIncome
        .filter((elem) => elem.type)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      setOperation(result);
      console.log(formData)
      setFormData({
        wallet: wallet ? wallet[0].name : "",
        category: category ? category[0].add[0].name : "",
        amount: "",
        type: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {!wallet ? <Loader type="spin" color="teal"></Loader> : null}
        {!category ? <Loader type="spin" color="teal"></Loader> : null}
        <div>Гаманець</div>
        <select
          name="wallet"
          onChange={handleInputChange}
          value={formData.wallet}
        >
          {wallet === undefined
            ? null
            : wallet.map(({ _id, name }) => {
                return <option key={_id}>{name}</option>;
              })}
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
          {category === undefined
            ? null
            : category[0].add.map(({ _id, name }) => (
                <option key={_id.toString()} value={name}>
                  {name}
                </option>
              ))}
        </select>
        <div>Сума</div>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        ></input>
        <button type="submit">ok</button>
      </Form>
      {/* <Keyboard></Keyboard> */}
    </>
  );
};

export default IncomeForm;
