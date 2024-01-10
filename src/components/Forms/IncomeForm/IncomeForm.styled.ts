import styled from "styled-components";
import { theme } from "theme/theme";

const Form = styled.form`
  border: 1px;
  display: block;
  margin: 0 auto;
`;

const SelectWrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Select = styled.select`
  font-size: ${theme.fontSizes.normal};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.light};
  border: none;
  border-radius: ${theme.radii.small};
  text-transform: uppercase;
  padding: 6px;
  height: 40px;
  width: 80%;
`;
const Option = styled.option`
  display: block;
  font-size: ${theme.fontSizes.bold};
  width: 300px;
  color: ${theme.colors.accentActive};
`;

const Input = styled.input`
  font-size: ${theme.fontSizes.normal};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.light};
  &::placeholder {
    color: ${theme.colors.light};
  }
  border: none;
  border-radius: ${theme.radii.small};
  text-transform: uppercase;
  padding: 6px;
  height: 40px;
  width: 100%;
`;

const ButtonEdit = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.accent};
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${theme.radii.small};
`;

const ButtonSubmit = styled.button`
  display: flex;
  width: 30%;
  margin: 0 auto;
  height: 40px;
  background-color: ${theme.colors.background};
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${theme.radii.small};
  transition: 0.3s;
  &:enabled {
    background-color: ${theme.colors.accent};
  }
`;

export { Form, SelectWrapper, Select, Option, Input, ButtonEdit, ButtonSubmit };
