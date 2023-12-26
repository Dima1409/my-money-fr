import { ExpensesHeader } from "./Expenses.styled";
import Operations from "components/HistoryOperations/Operations";
import ExpenseForm from "components/Forms/ExpensesForm/ExpensesForm";
import { OperationsHeader } from "components/HistoryOperations/Operations/Operations.styled";
import useOperations from "hooks/useOperations";
import { ISearchOperation } from "types/data";

const Expenses: React.FC = () => {
  const { operations } = useOperations();
  const expensesOperations: ISearchOperation[] = operations.filter(
    (elem: ISearchOperation) => elem.type === "expense"
  );

  const sortedExpenseOperation: ISearchOperation[] = expensesOperations.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <ExpensesHeader>Витрати</ExpensesHeader>
      <ExpenseForm></ExpenseForm>
      <OperationsHeader>Історія витрат</OperationsHeader>
      <Operations operationsType={sortedExpenseOperation} />
    </>
  );
};

export default Expenses;
