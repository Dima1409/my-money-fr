import styled from "styled-components";
import { theme } from "theme/theme";

const HeaderWelcome = styled.h2`
  margin: 50px 0;
  font-size: ${theme.fontSizes.bold};
  font-weight: ${theme.fontWeight.bold};
  font-family: ${theme.fonts.merriweather};
  color: ${theme.colors.accent};
  text-align: center;
`;

const Description = styled.span`
  display: block;
  text-align: center;
  color: ${theme.colors.accent};
  font-family: ${theme.fonts.comfortaa};
`;

export { HeaderWelcome, Description };
