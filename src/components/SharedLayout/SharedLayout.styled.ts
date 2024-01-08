import styled from "styled-components";
import { theme } from "theme/theme";
import { NavLink } from "react-router-dom";

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  ${theme.mq.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NavListItem = styled.li`
  margin: 10px 0;
  text-align: center;
  background-color: ${theme.colors.accent};
  border-radius: ${theme.radii.small};
  ${theme.mq.tablet} {
    margin-right: 42px;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 10px 40px;
  color: ${theme.colors.light};
  border-radius: ${theme.radii.small};
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: ${theme.colors.accentActive};
  }
`;

const Logout = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
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

export { NavList, NavListItem, Link, Logout };
