import styled from "styled-components";
import { theme } from "theme/theme";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderInfo = styled.p`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.small};
  margin-bottom: 10px;
  font-family: ${theme.fonts.comfortaa};
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.extraBold};
  }
`;

const ImageStyled = styled.img`
  margin-bottom: 10px;
  border: ${theme.borders.normal};
  border: none;
  border-radius: ${theme.radii.normal};
  box-shadow: 0 0 10px ${theme.colors.accentActive};
`;

export { SliderInfo, WrapperStyled, ImageStyled };
