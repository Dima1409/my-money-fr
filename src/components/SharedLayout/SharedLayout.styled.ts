import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  margin: 10px 0;
  text-align: center;
  background-color: darkblue;
`;

const Link = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 6px;
  color: white;
  &:hover {
    cursor: pointer;
  }
  &.active {
    background-color: aqua;
  }
`;

export { NavList, NavListItem, Link };
