import { Month } from "./Statistics.styled";
import useOperations from "hooks/useOperations";
// import Diagram from "components/Diagram/Diagram";
// import { ISearchOperation } from "types/data";

const Statistics = () => {
  const { operations } = useOperations();
  const incomeOperations = operations.filter((item) => item.type === "income");

  const obj = Object.entries(
    incomeOperations.reduce((acc: any, elem: any) => {
      if (acc.hasOwnProperty(elem.category)) {
        acc[elem.category] += parseInt(elem.amount, 0);
      } else {
        acc[elem.category] = parseInt(elem.amount, 0);
      }
      return acc;
    }, {})
  ).map(([category, amount]) => ({ category, amount }));
  console.log(obj);

  const expenseOperations = operations.filter(
    (item) => item.type === "expense"
  );
  const totalIncomeSum = incomeOperations
    .map((elem) => Number(elem.amount))
    .reduce((acc, item) => acc + item, 0);
  const totalExpenseSum = expenseOperations
    .map((elem) => Number(elem.amount))
    .reduce((acc, item) => acc + item, 0);
  return (
    <>
      <Month>Місяць</Month>
      <div>
        <div>
          <div>
            Всього доходи: <span>{totalIncomeSum}</span>
          </div>
          {obj.map(({ category, amount }) => (
            <div key={category}>
              <div>
                Категорія: {category}{" "}
                <span>
                  {((Number(amount) * 100) / totalIncomeSum).toFixed(1)} %
                </span>
              </div>
              <div>Сума: {amount as number}</div>
            </div>
          ))}
        </div>
        <div>
          <div>
            Всього витрати: <span>{totalExpenseSum}</span>
          </div>
          {obj.map(({ category, amount }) => (
            <div key={category}>
              <div>
                Категорія: {category}{" "}
                <span>
                  {((Number(amount) * 100) / totalExpenseSum).toFixed(1)} %
                </span>
              </div>
              <div>Сума: {amount as number}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Statistics;
