import styled from "styled-components";
import { Field } from "formik";
import { theme } from "theme/theme";

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const User = styled.p`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.small};
  font-family: ${theme.fonts.merriweather};
  font-weight: ${theme.fontWeight.bold};
  text-transform: uppercase;
  margin-left: auto;
  margin-right: 10px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.bold};
  }
`;

const Logout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 30px;
  height: 30px;
  padding: 4px;
  background-color: ${theme.colors.accent};
  border: none;
  border-radius: ${theme.radii.round};
  color: ${theme.colors.dark};
  &:hover {
    cursor: pointer;
  }
`;

const InputEdit = styled(Field)`
  display: block;
  outline: none;
  border-radius: ${theme.radii.small};
  border: ${theme.borders.normal} transparent;
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.dark};
  padding: 4px 6px;
  height: 40px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.bold};
  }
  &.success {
    border-color: ${theme.colors.valid};
  }
  &.error {
    border-color: ${theme.colors.invalid};
  }
`;

const EditButton = styled(Logout)`
  margin-right: 6px;
`;

export { UserWrapper, User, Logout, InputEdit, EditButton };
