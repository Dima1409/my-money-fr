import { Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { NavList, Link, NavListItem, IconHome } from "./SharedLayout.styled";

const SharedLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <NavList>
        <NavListItem>
          <Link to="/">
            <IconHome />
          </Link>
        </NavListItem>
        {!isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/register">Реєстрація</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/login">Вхід</Link>
            </NavListItem>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/incomes">Доходи</Link>
            </NavListItem>
            <NavListItem>
              <Link to="/expenses">Витрати</Link>
            </NavListItem>
          </>
        )}
      </NavList>
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
