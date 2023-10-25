import { Form } from "./IncomeForm.styled";
import { wallets, categories } from "services/api";
import { useEffect, useState } from "react";
import { ISearchWallet, ISearchCategory } from "types/data";
import Loader from "components/Loader";
import Keyboard from "components/Keyboard";

const IncomeForm: React.FC = () => {
  const [wallet, setWallet] = useState<ISearchWallet[] | undefined>();
  const [category, setCategory] = useState<ISearchCategory[] | undefined>();
  useEffect(() => {
    const getData = async () => {
      try {
        const totalWallets: ISearchWallet[] = await wallets();
        const totalCategories: ISearchCategory[] = await categories();
        // const tot = totalCategories[0].add;
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
            : category.map(({ add }) => {
                return add.map((value) => <option>{value}</option>);
              })}
        </select>
      </Form>
      <Keyboard></Keyboard>
    </>
  );
};

export default IncomeForm;
