import React from "react";
import GoHomeLink from "components/GoHomeLink";
import Operations from "components/HistoryOperations/Operations";
import { IncomeHeader } from "./Income.styled";
import IncomeForm from "components/Forms/IncomeForm";
import { OperationsHeader } from "components/HistoryOperations/Operations/Operations.styled";
import { ISearchOperation } from "types/data";
import useOperations from "hooks/useOperations";

const Income: React.FC = () => {
  const { operations } = useOperations();

  const incomeOperations: ISearchOperation[] = operations.filter(
    (elem: ISearchOperation) => elem.type === "income"
  );

  const sortedIncomeOperations = incomeOperations.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <GoHomeLink></GoHomeLink>
      <IncomeHeader>Мої доходи</IncomeHeader>
      <IncomeForm></IncomeForm>
      <OperationsHeader>Історія доходів</OperationsHeader>
      <Operations operationsType={sortedIncomeOperations}></Operations>
    </>
  );
};

export default Income;
