import { Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { NavList, Link, NavListItem } from "./SharedLayout.styled";
import { AiOutlineHome } from "react-icons/ai";
import { theme } from "theme/theme";

const SharedLayout: React.FC = () => {
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
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
