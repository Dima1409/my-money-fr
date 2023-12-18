import React from "react";
import GoHomeLink from "components/GoHomeLink";
import Operations from "components/HistoryOperations/Operations";
import { IncomeHeader } from "./Income.styled";
// import IncomeForm from "components/Forms/IncomeForm";
import { OperationsHeader } from "components/HistoryOperations/Operations/Operations.styled";

const Income: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <IncomeHeader>Мої доходи</IncomeHeader>
      {/* <IncomeForm></IncomeForm> */}
      <OperationsHeader>Історія доходів</OperationsHeader>
      <Operations type={"income"}/>
    </>
  );
};

export default Income;
