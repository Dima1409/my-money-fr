import { Month } from "./Statistics.styled";
import useOperations from "hooks/useOperations";
import Diagram from "components/Diagram/Diagram";
// import { ISearchOperation } from "types/data";

const Statistics = () => {
  const { operations } = useOperations();
  const incomesOperations = operations.filter((item) => item.type === "income");
  // const expensesOperations = operations.filter(
  //   (item) => item.type === "expense"
  // );

  const income = Object.entries(
    incomesOperations.reduce((acc: any, elem: any) => {
      if (acc.hasOwnProperty(elem.category)) {
        acc[elem.category] += parseInt(elem.amount, 0);
      } else {
        acc[elem.category] = parseInt(elem.amount, 0);
      }
      return acc;
    }, {})
  ).map(([category, amount]) => ({
    category,
    amount: Number(amount), // Explicitly specify the type as number
  }));
  console.log(income);

  // const expense = Object.entries(
  //   expensesOperations.reduce((acc: any, elem: any) => {
  //     if (acc.hasOwnProperty(elem.category)) {
  //       acc[elem.category] += parseInt(elem.amount, 0);
  //     } else {
  //       acc[elem.category] = parseInt(elem.amount, 0);
  //     }
  //     return acc;
  //   }, {})
  // ).map(([category, amount]) => ({ category, amount }));

  const totalIncomeSum = incomesOperations.reduce(
    (acc, item) => acc + Number(item.amount),
    0
  );
  console.log("totalIncome", totalIncomeSum);

  // const totalExpenseSum = expensesOperations.reduce(
  //   (acc, item) => acc + Number(item),
  //   0
  // );
  const getMonthName = () => {
    const monthIndex = new Date().getMonth();
    const monthNames = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];

    return monthNames[monthIndex];
  };
  const month = getMonthName();
  return (
    <>
      <Month>
        Місяць: {month}{" "}
        <div>
          Всього доходи: <span>{totalIncomeSum} грн</span>
        </div>
      </Month>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Diagram data={income} title="Доходи"></Diagram>
        </div>

        {/* <div>
          <div>
            Всього витрати: <span>{totalExpenseSum}</span>
          </div>
          {expense.map(({ category, amount }) => (
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
        </div> */}
      </div>
    </>
  );
};

export default Statistics;
