import styled from "styled-components";
import { theme } from "theme/theme";

const ExpensesHeader = styled.h2`
  color: ${theme.colors.expensesHeader};
  text-align: center;
  font-size: ${theme.fontSizes.extraBold};
`;

export { ExpensesHeader };
