import { Form } from "../IncomeForm/IncomeForm.styled";
import { wallets, categories } from "services/api";
import { useEffect, useState } from "react";
import { ISearchWallet, ISearchCategorySell } from "types/data";
import Loader from "components/Loader";
import Keyboard from "components/Keyboard";

const ExpensesForm: React.FC = () => {
  const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [category, setCategory] = useState<ISearchCategorySell[] | undefined>();
  useEffect(() => {
    const getData = async () => {
      try {
        const totalWallets: ISearchWallet[] = await wallets();
        const totalCategories: ISearchCategorySell[] = await categories();
        setWallet(totalWallets);
        setCategory(totalCategories);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Form>
        {!wallet ? <Loader type="spin" color="teal"></Loader> : null}
        <div>Гаманець</div>
        <select>
          {wallet === undefined
            ? null
            : wallet.map(({ _id, name }) => {
                return <option key={_id}>{name}</option>;
              })}
        </select>
        <div>Категорія</div>
        <select>
          {category === undefined
            ? null
            : category[1].sell.map(({ _id, name }) => (
                <option key={_id.toString()}>{name}</option>
              ))}
        </select>
      </Form>
      <Keyboard></Keyboard>
    </>
  );
};

export default ExpensesForm;
