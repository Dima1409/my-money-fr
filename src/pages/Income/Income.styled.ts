import styled from "styled-components";
import { theme } from "theme/theme";

const IncomeHeader = styled.h2`
  color: ${theme.colors.incomeHeader};
  text-align: center;
  font-size: ${theme.fontSizes.extraBold};
  margin-bottom: 20px;
`;

export { IncomeHeader };
