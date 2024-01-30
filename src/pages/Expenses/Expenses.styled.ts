import styled from "styled-components";
import { theme } from "theme/theme";
import { IncomeHeader } from "pages/Income/Income.styled";

const ExpensesHeader = styled(IncomeHeader)`
  color: ${theme.colors.expensesHeader};
`;

export { ExpensesHeader };
