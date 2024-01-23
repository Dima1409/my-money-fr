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
  margin-right: 10px;
  font-size: ${theme.fontSizes.normal};
  background-color: ${theme.colors.accent};
  color: ${theme.colors.light};
  border: none;
  border-radius: ${theme.radii.small};
  text-transform: uppercase;
  padding: 6px;
  min-height: 40px;
  width: 280px;
  margin-left: auto;
  ${theme.mq.tablet} {
    width: 40%;
    margin-left: auto;
  }
  ${theme.mq.desktop} {
    width: 20%;
    margin-left: auto;
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: inherit;
  }
  &:focus {
    background-color: ${theme.colors.accentActive};
  }
`;
const Option = styled.option`
  display: block;
  font-size: ${theme.fontSizes.bold};
  color: ${theme.colors.accentActive};
`;

const Input = styled.input`
  font-size: ${theme.fontSizes.normal};
  margin: 0 auto;
  background-color: ${theme.colors.accent};
  color: ${theme.colors.light};
  width: 280px;
  &::placeholder {
    color: ${theme.colors.light};
  }
  border: ${theme.borders.normal} transparent;
  border-radius: ${theme.radii.small};
  outline: none;
  text-transform: uppercase;
  padding-left: 6px;
  min-height: 40px;
  ${theme.mq.tablet} {
    width: 30%;
  }
  ${theme.mq.desktop} {
    width: 20%;
  }
  &:valid {
    border-color: ${theme.colors.valid};
  }
  &:invalid {
    border-color: ${theme.colors.invalid};
  }
`;

const ButtonEdit = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  background-color: ${theme.colors.accent};
  justify-content: center;
  align-items: center;
  margin-right: auto;
  border: none;
  border-radius: ${theme.radii.small};
  transition: 0.3s;
  &:hover {
    cursor: pointer;
  }
  ${theme.mq.tablet} {
    margin-right: auto;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonSubmit = styled.button`
  display: flex;
  width: 30%;
  margin: 4px;
  height: 40px;
  background-color: ${theme.colors.accent};
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: ${theme.radii.small};
  transition: 0.3s;
  ${theme.mq.tablet} {
    width: 10%;
  }
  &:disabled {
    opacity: 0.5;
  }
  &:hover:not(:disabled) {
    cursor: pointer;
  }
`;

export {
  Form,
  SelectWrapper,
  Select,
  Option,
  Input,
  ButtonEdit,
  ButtonsWrapper,
  ButtonSubmit,
};
