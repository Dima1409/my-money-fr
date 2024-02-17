import {
  Month,
  HeaderTotal,
  TabPanelStyled,
  TabsStyled,
  TabStyled,
  TabListStyled,
} from "./Statistics.styled";
import { useState } from "react";
import useOperations from "hooks/useOperations";
import Diagram from "components/Diagram/Diagram";
import monthNames from "utils/months";
import { ISearchOperation } from "types/data";
import "react-tabs/style/react-tabs.css";
import Container from "components/Container";

interface CategorizedAmount {
  category: string;
  amount: number;
}

const Statistics = () => {
  const { operations } = useOperations();

  const typesOfOperations = (arr: ISearchOperation[], value: string) => {
    return arr.filter((elem) => elem.type === value);
  };

  const calculateCategoryTotal = (
    operations: ISearchOperation[]
  ): CategorizedAmount[] => {
    return Object.entries(
      operations.reduce((acc, elem) => {
        const category = elem.category;
        const amount =
          typeof elem.amount === "string"
            ? parseFloat(elem.amount)
            : elem.amount;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {} as Record<string, number>)
    ).map(([category, amount]) => ({
      category,
      amount: Number(amount),
    }));
  };

  const calculateTotal = (operations: CategorizedAmount[]) => {
    return operations.reduce((acc, item) => acc + Number(item.amount), 0);
  };

  const incomesOperations = typesOfOperations(operations, "income");
  const expensesOperations = typesOfOperations(operations, "expense");

  const incomeTotal: CategorizedAmount[] =
    calculateCategoryTotal(incomesOperations);
  const expenseTotal: CategorizedAmount[] =
    calculateCategoryTotal(expensesOperations);

  const totalIncome = calculateTotal(incomesOperations);
  const totalExpense = calculateTotal(expensesOperations);

  const getMonthName = () => {
    const monthIndex = new Date().getMonth();
    return monthNames[monthIndex];
  };
  const month = getMonthName();
  const year = new Date().getFullYear();

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container>
      <Month>
        Місяць: {month} {year}
      </Month>
      <TabsStyled
        selectedIndex={tabIndex}
        onSelect={(index: number) => setTabIndex(index)}
      >
        <TabListStyled>
          <TabStyled>Доходи</TabStyled>
          <TabStyled>Витрати</TabStyled>
        </TabListStyled>

        <TabPanelStyled>
          <HeaderTotal>
            Всього: <span>{totalIncome} грн</span>
          </HeaderTotal>

          <Diagram data={incomeTotal} title="Доходи"></Diagram>
        </TabPanelStyled>

        <TabPanelStyled>
          <HeaderTotal>
            Всього: <span>{totalExpense} грн</span>
          </HeaderTotal>

          <Diagram data={expenseTotal} title="Витрати"></Diagram>
        </TabPanelStyled>
      </TabsStyled>
    </Container>
  );
};

export default Statistics;
