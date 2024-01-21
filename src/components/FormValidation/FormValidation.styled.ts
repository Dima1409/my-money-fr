import styled from "styled-components";
import { theme } from "theme/theme";

const Error = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  left: 50%;
  top: 65px;
  transform: translateX(-50%);
  font-size: ${theme.fontSizes.extraSmall};
  color: ${theme.colors.invalid};
`;

const Correct = styled(Error)`
  color: ${theme.colors.valid};
`;

export { Error, Correct };
