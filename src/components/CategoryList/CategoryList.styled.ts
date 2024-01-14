import styled from "styled-components";
import { theme } from "theme/theme";

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 18px;
`;

const LabelSelect = styled.label`
  width: 100%;
  display: flex;
  padding: 4px;
  justify-content: space-around;
  align-items: center;
  border: ${theme.borders.normal};
  border-radius: ${theme.radii.normal};
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const InputRadio = styled.input`
  margin: 0;
  margin-right: 6px;
  &:hover {
    cursor: pointer;
  }
`;

export { RadioWrapper, LabelSelect, InputRadio };
