import styled from "styled-components";
import { theme } from "theme/theme";

const Error = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  left: 50%;
  top: 70px;
  transform: translateX(-50%);
  font-size: 10px;
  color: ${theme.colors.invalid};
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.small};
    top: 62px;
  }
  ${theme.mq.desktop} {
    top: 60px;
    font-size: ${theme.fontSizes.normal};
  }
`;

const Correct = styled(Error)`
  color: ${theme.colors.valid};
`;

export { Error, Correct };
