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
import Keyboard from "components/Keyboard";

const IncomeForm: React.FC = () => {
  // const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [operation, setOperation] = useState<ISearchOperation[] | undefined>();
  const [category, setCategory] = useState<ISearchCategoryAdd[] | undefined>();
  const [formData, setFormData] = useState({
    category: category ? category[0].add[0].name : "",
    add: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        // const totalWallets: ISearchWallet[] = await wallets();
        const totalCategories: ISearchCategoryAdd[] = await categories();
        setCategory(totalCategories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log("operation useEffect", operation);
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
      const res = await addOperation(formData);
      console.log("Operation added successfully", res);
      const operationsIncome: ISearchOperation[] = await operations();
      console.log("operation income", operationsIncome);
      const result = operationsIncome
        .filter((elem) => elem.add)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      setOperation(result);

      setFormData({
        // wallet: wallet ? wallet[2].name : "",
        category: category ? category[0].add[0].name : "",
        add: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* {!wallet ? <Loader type="spin" color="teal"></Loader> : null} */}
        {!category ? <Loader type="spin" color="teal"></Loader> : null}
        <div>Гаманець Готівка</div>
        {/* <select
          name="wallet"
          onChange={handleInputChange}
          value={formData.wallet}
        >
          {wallet === undefined
            ? null
            : wallet.map(({ _id, name }) => {
                return <option key={_id}>{name}</option>;
              })}
        </select> */}
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
        <input
          type="text"
          name="add"
          value={formData.add}
          onChange={handleInputChange}
        ></input>
        <button type="submit">ok</button>
      </Form>
      {/* <Keyboard></Keyboard> */}
    </>
  );
};

export default IncomeForm;
