import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { ThunkDispatch } from "@reduxjs/toolkit";

const SharedLayout: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  return (
    <>
      <div>Welcome to MYMoney</div>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        <li style={{ margin: "8px" }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ margin: "8px" }}>
          <Link to="/login">Login</Link>
        </li>
        <li style={{ margin: "8px" }}>
          <Link to="/register">Register</Link>
        </li>
        <li style={{ margin: "8px" }}>
          <Link to="/income">Income</Link>
        </li>
        <li style={{ margin: "8px" }}>
          <Link to="/expenses">Expenses</Link>
        </li>
        {/* <li>
          <Link to="transfers">Transfers</Link>
        </li> */}
      </ul>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
