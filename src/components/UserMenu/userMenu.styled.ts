import styled from "styled-components";
import { Field } from "formik";
import { theme } from "theme/theme";

const UserWrapper = styled.div`
  display: flex;
  align-items: end;
  margin: 0 auto;
  margin-bottom: 10px;
  max-width: 600px;
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

const AvatarContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: ${theme.radii.normal};
`;

const AvatarWrapper = styled.div`
  display: "flex";
  flex-direction: "column";
  justify-content: "center";
  align-items: "center";
  padding-top: "40px";
  padding-bottom: "40px";
  & > div > div {
    margin: 0 auto;
  }
  & > p {
    color: ${theme.colors.light};
    text-align: right;
    margin: 10px 0;
  }
  & > button {
    margin: 0 auto;
  }
`;

const UserAvatar = styled.img`
  margin-right: auto;
  margin-left: 0;
  border: ${theme.borders.normal};
  object-fit: cover;
  border: none;
  border-radius: ${theme.radii.normal};
  box-shadow: 0 0 1px ${theme.colors.accentActive};
  transition: ${theme.transitions.durations.default};
  width: 100%;
  height: 100%;
  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

const DeleteAvatar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border: ${theme.borders.normal} ${theme.colors.light};
  border-radius: ${theme.radii.normal};
  color: ${theme.colors.light};
  background-color: transparent;
  transition: ${theme.transitions.durations.default};
  &:hover,
  &:focus {
    cursor: pointer;
    box-shadow: 0 0 4px ${theme.colors.light};
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

export {
  UserWrapper,
  User,
  AvatarContainer,
  AvatarWrapper,
  DeleteAvatar,
  UserAvatar,
  Logout,
  InputEdit,
  EditButton,
};
