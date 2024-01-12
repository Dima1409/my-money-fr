import styled from "styled-components";
import { theme } from "theme/theme";

const WalletsHeader = styled.h2`
  text-align: center;
  font-family: ${theme.fonts.merriweather};
  color: ${theme.colors.light};
  font-size: ${theme.fontSizes.extraBold};
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: 10px;
`;



export { WalletsHeader };
