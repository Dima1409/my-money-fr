import styled from "styled-components";
import { theme } from "theme/theme";

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const User = styled.p`
  color: ${theme.colors.accent};
  font-size: ${theme.fontSizes.bold};
  font-family: ${theme.fonts.merriweather};
  font-weight: ${theme.fontWeight.bold};
  text-transform: uppercase;
  margin-left: auto;
  margin-right: 10px;
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

const InputEdit = styled.input`
  outline: none;
  border: none;
  width: 100%;
  border-radius: ${theme.radii.small};
  font-size: ${theme.fontSizes.normal};
  color: ${theme.colors.dark};
  padding: 4px 6px;
  height: 40px;
  margin-bottom: 10px;
  ${theme.mq.tablet} {
    font-size: ${theme.fontSizes.bold};
  }
`;

const EditButton = styled(Logout)`
  margin-right: 6px;
`;


export { UserWrapper, User, Logout, InputEdit, EditButton };
