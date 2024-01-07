import { ExpensesHeader } from "./Expenses.styled";
import ExpenseForm from "components/Forms/ExpensesForm/ExpensesForm";
import React from "react";
import Operations from "components/HistoryOperations/Operations";
import { ISearchOperation } from "types/data";
import useOperations from "hooks/useOperations";
import useCategory from "hooks/useCategory";
import useWallets from "hooks/useWallets";
import Loader from "components/Loader";

const Expenses: React.FC = () => {
  const { isLoading: operationsLoading, operations } = useOperations();
  const { isLoading: walletsLoading, wallets } = useWallets();
  const { isLoading: categoriesLoading, categories } = useCategory();

  const expenseOperations: ISearchOperation[] = operations.filter(
    (elem: ISearchOperation) => elem.type === "expense"
  );

  const sortedExpenseOperations = expenseOperations.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <>
      <ExpensesHeader>Витрати</ExpensesHeader>
      {walletsLoading && categoriesLoading ? (
        <Loader type="spin" />
      ) : (
        <>
          {wallets && categories ? (
            <ExpenseForm></ExpenseForm>
          ) : (
            <div>Error page</div>
          )}
        </>
      )}
      <ExpensesHeader>Історія доходів</ExpensesHeader>
      {operationsLoading ? (
        <Loader type="spin"/>
      ) : (
        <>
          {operations ? (
            <Operations operationsType={sortedExpenseOperations}></Operations>
          ) : (
            <div>errorpage</div>
          )}
        </>
      )}
    </>
  );
};

export default Expenses;
