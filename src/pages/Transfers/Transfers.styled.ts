import styled from "styled-components";
import { theme } from "theme/theme";
import { IncomeHeader } from "pages/Income/Income.styled";

const TransfersHeader = styled(IncomeHeader)`
  color: ${theme.colors.transfers};
`;

export { TransfersHeader };
