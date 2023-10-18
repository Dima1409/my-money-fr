import React from "react";
import Keyboard from "components/Keyboard";
import GoHomeLink from "components/GoHomeLink";
import OperationsIncome from "components/HistoryOperations/OperationsIncome";
import { IncomeHeader } from "./Income.styled";

const Income: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <IncomeHeader>Мої доходи</IncomeHeader>
      <Keyboard />
      <OperationsIncome />
    </>
  );
};

export default Income;
