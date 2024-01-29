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
    margin-right: 2px;
    min-width: 150px;
  }
  ${theme.mq.desktop} {
    min-width: 200px;
    margin-right: 15px;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const Link = styled(NavLink)`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 10px 15px;
  min-height: 30px;
  color: ${theme.colors.light};
  border-radius: ${theme.radii.small};
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: ${theme.colors.accentActive};
  }
`;

export { NavList, NavListItem, Link };
