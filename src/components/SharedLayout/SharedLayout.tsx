import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useAuth from "hooks/useAuth";
import { NavList, Link, NavListItem } from "./SharedLayout.styled";

const SharedLayout: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn } = useAuth();
  return (
    <>
      <NavList>
        <NavListItem>
          <Link to="/">Home</Link>
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
            <NavListItem>
              <button onClick={() => dispatch(logout())}>Logout</button>
            </NavListItem>
          </>
        )}
      </NavList>

      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
