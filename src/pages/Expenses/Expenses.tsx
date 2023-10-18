import { ExpensesHeader } from "./Expenses.styled";
import GoHomeLink from "components/GoHomeLink";
import Keyboard from "components/Keyboard";
import OperationsExpenses from "components/HistoryOperations/OperationsExpenses";

const Expenses: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <ExpensesHeader>Мої витрати</ExpensesHeader>
      <Keyboard></Keyboard>
      <OperationsExpenses></OperationsExpenses>
    </>
  );
};

export default Expenses;
