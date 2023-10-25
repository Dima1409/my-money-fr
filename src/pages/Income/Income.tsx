import React from "react";
import GoHomeLink from "components/GoHomeLink";
import OperationsIncome from "components/HistoryOperations/OperationsIncome";
import { IncomeHeader } from "./Income.styled";
import IncomeForm from "components/Forms/IncomeForm";

const Income: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <IncomeHeader>Мої доходи</IncomeHeader>
      <IncomeForm></IncomeForm>
      <OperationsIncome />
    </>
  );
};

export default Income;
