import {
  SelectStyled,
  OptionStyled,
  SelectWrapperStyled,
  Month,
  HeaderTotal,
  TabPanelStyled,
  TabsStyled,
  TabStyled,
  TabListStyled,
} from "./Statistics.styled";
import { useState, useEffect } from "react";
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

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();
  const currentMonth = monthNames[currentMonthIndex];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  //
  const [incomeTotalDiagram, setIncomeTotalDiagram] = useState<
    CategorizedAmount[]
  >([]);
  const [expenseTotalDiagram, setExpenseTotalDiagram] = useState<
    CategorizedAmount[]
  >([]);

  useEffect(() => {
    const filterOperationsByTypeAndDate = (type: string) =>
      typesOfOperations(operations, type).filter(
        (operation) =>
          new Date(operation.createdAt).getMonth() ===
            monthNames.indexOf(selectedMonth) &&
          new Date(operation.createdAt).getFullYear() === selectedYear
      );

    const incomesForSelectedMonthYear = filterOperationsByTypeAndDate("income");
    const expensesForSelectedMonthYear =
      filterOperationsByTypeAndDate("expense");

    const newIncomeTotalDiagram = calculateCategoryTotal(
      incomesForSelectedMonthYear
    );
    const newExpenseTotalDiagram = calculateCategoryTotal(
      expensesForSelectedMonthYear
    );

    setIncomeTotalDiagram(newIncomeTotalDiagram);
    setExpenseTotalDiagram(newExpenseTotalDiagram);
  }, [selectedMonth, selectedYear, operations]);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = parseInt(event.target.value, 10);
    setSelectedYear(isNaN(yearValue) ? currentYear : yearValue);
  };

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

  const incomesOperations = typesOfOperations(operations, "income");
  const expensesOperations = typesOfOperations(operations, "expense");

  const calculateTotal = (operations: CategorizedAmount[]) => {
    return operations.reduce((acc, item) => acc + Number(item.amount), 0);
  };

  const calculateTotalForType = (
    operations: ISearchOperation[],
    type: string
  ): number => {
    const filteredOperations = operations.filter(
      (operation) =>
        operation.type === type &&
        new Date(operation.createdAt).getMonth() ===
          monthNames.indexOf(selectedMonth) &&
        new Date(operation.createdAt).getFullYear() === selectedYear
    );

    return calculateTotal(filteredOperations);
  };

  const totalIncome = calculateTotalForType(incomesOperations, "income");
  const totalExpense = calculateTotalForType(expensesOperations, "expense");

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container>
      <Month>
        <SelectWrapperStyled>
          Місяць:{" "}
          <SelectStyled value={selectedMonth} onChange={handleMonthChange}>
            {monthNames.map((elem, index) => (
              <OptionStyled key={index}>{elem}</OptionStyled>
            ))}
          </SelectStyled>
        </SelectWrapperStyled>
        <SelectWrapperStyled>
          Рік:{" "}
          <SelectStyled value={selectedYear} onChange={handleYearChange}>
            <OptionStyled>{currentYear}</OptionStyled>
            <OptionStyled>{currentYear - 1}</OptionStyled>
          </SelectStyled>
        </SelectWrapperStyled>
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

          <Diagram data={incomeTotalDiagram} title="Доходи"></Diagram>
        </TabPanelStyled>

        <TabPanelStyled>
          <HeaderTotal>
            Всього: <span>{totalExpense} грн</span>
          </HeaderTotal>
          <Diagram data={expenseTotalDiagram} title="Витрати"></Diagram>
        </TabPanelStyled>
      </TabsStyled>
    </Container>
  );
};

export default Statistics;
