import styled from "styled-components";
import { theme } from "theme/theme";

const HeaderWelcome = styled.h2`
  margin: 8px 0;
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeight.bold};
  font-family: ${theme.fonts.merriweather};
  color: ${theme.colors.accent};
  text-align: center;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.extraBold};
  }
`;

const Description = styled.span`
  margin: 40px 0;
  display: block;
  text-align: center;
  color: ${theme.colors.accent};
  font-family: ${theme.fonts.comfortaa};
`;

export { HeaderWelcome, Description };
