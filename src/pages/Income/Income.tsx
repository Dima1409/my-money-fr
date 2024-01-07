import React from "react";
import Operations from "components/HistoryOperations/Operations";
import { IncomeHeader } from "./Income.styled";
import IncomeForm from "components/Forms/IncomeForm";
import { ISearchOperation } from "types/data";
import useOperations from "hooks/useOperations";
import useCategory from "hooks/useCategory";
import useWallets from "hooks/useWallets";
import Loader from "components/Loader";

const Income: React.FC = () => {
  const { isLoading: operationsLoading, operations } = useOperations();
  const { isLoading: walletsLoading, wallets } = useWallets();
  const { isLoading: categoriesLoading, categories } = useCategory();

  const incomeOperations: ISearchOperation[] = operations.filter(
    (elem: ISearchOperation) => elem.type === "income"
  );

  const sortedIncomeOperations = incomeOperations.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <IncomeHeader>Доходи</IncomeHeader>
      {walletsLoading && categoriesLoading ? (
        <Loader type="spin"/>
      ) : (
        <>
          {wallets && categories ? (
            <IncomeForm></IncomeForm>
          ) : (
            <div>Error page</div>
          )}
        </>
      )}
      <IncomeHeader>Історія доходів</IncomeHeader>
      {operationsLoading ? (
        <Loader type="spin"/>
      ) : (
        <>
          {operations ? (
            <Operations operationsType={sortedIncomeOperations}></Operations>
          ) : (
            <div>errorpage</div>
          )}
        </>
      )}
    </>
  );
};

export default Income;
