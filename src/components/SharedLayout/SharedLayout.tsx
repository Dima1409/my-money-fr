import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useAuth from "hooks/useAuth";

const SharedLayout: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoggedIn } = useAuth();
  return (
    <>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
          margin: 0,
        }}
      >
        <li style={{ margin: "8px" }}>
          <Link to="/">Home</Link>
        </li>
        {!isLoggedIn && (
          <>
            <li style={{ margin: "8px" }}>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li style={{ margin: "8px" }}>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li style={{ margin: "8px" }}>
          <Link to="/incomes">Income</Link>
        </li>
        <li style={{ margin: "8px" }}>
          <Link to="/expenses">Expenses</Link>
        </li>
        {/* <li>
          <Link to="transfers">Transfers</Link>
        </li> */}
      </ul>
      {isLoggedIn && <button onClick={() => dispatch(logout())}>Logout</button>}
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
