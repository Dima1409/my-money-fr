import styled from "styled-components";
import { theme } from "theme/theme";

const RadioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 180px;
`;

const LabelSelect = styled.label`
  display: flex;
  padding: 4px;
  justify-content: space-around;
  align-items: center;
  border: ${theme.borders.normal};
  border-radius: ${theme.radii.normal};
  margin-bottom: 5px;
  font-size: ${theme.fontSizes.small};
  &:hover {
    cursor: pointer;
  }
`;

const InputRadio = styled.input`
  margin: 0;
  margin-right: 6px;
  font-size: ${theme.fontSizes.small};
  &:hover {
    cursor: pointer;
  }
`;

export { RadioWrapper, LabelSelect, InputRadio };
