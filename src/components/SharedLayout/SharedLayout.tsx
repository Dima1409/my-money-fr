import { Link, Outlet } from "react-router-dom";

const SharedLayout: React.FC = () => {
  return (
    <>
      <div>Welcome to MYMoney</div>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/income">Income</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        {/* <li>
          <Link to="transfers">Transfers</Link>
        </li> */}
      </ul>
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
