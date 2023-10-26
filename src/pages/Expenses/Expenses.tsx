import { ExpensesHeader } from "./Expenses.styled";
import GoHomeLink from "components/GoHomeLink";
import OperationsExpenses from "components/HistoryOperations/OperationsExpenses";
import Form from "components/Forms/ExpensesForm";
const Expenses: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <ExpensesHeader>Мої витрати</ExpensesHeader>
      <Form></Form>
      <OperationsExpenses></OperationsExpenses>
    </>
  );
};

export default Expenses;
