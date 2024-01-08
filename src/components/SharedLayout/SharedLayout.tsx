import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useAuth from "hooks/useAuth";
import { NavList, Link, NavListItem, Logout } from "./SharedLayout.styled";
import { AiOutlineLogout, AiOutlineHome } from "react-icons/ai";
import { theme } from "theme/theme";

const SharedLayout: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn } = useAuth();
  return (
    <>
      <NavList>
        <NavListItem>
          <Link to="/">
            <AiOutlineHome color={theme.colors.light} size={16} />
          </Link>
        </NavListItem>
        {!isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/register">Register</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/login">Login</Link>
            </NavListItem>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/incomes">Income</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/expenses">Expenses</Link>
            </NavListItem>
          </>
        )}
      </NavList>
      <Logout onClick={() => dispatch(logout())}>
        <AiOutlineLogout color={theme.colors.light} size={16} />
      </Logout>
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
