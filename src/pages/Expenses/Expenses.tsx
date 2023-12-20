import { ExpensesHeader } from "./Expenses.styled";
import GoHomeLink from "components/GoHomeLink";
import Operations from "components/HistoryOperations/Operations";
import Form from "components/Forms/ExpensesForm";
import { OperationsHeader } from "components/HistoryOperations/Operations/Operations.styled";

const Expenses: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <ExpensesHeader>Мої витрати</ExpensesHeader>
      <Form></Form>
      <OperationsHeader>Історія витрат</OperationsHeader>
      <Operations type='expense' />
    </>
  );
};

export default Expenses;
