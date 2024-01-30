import { Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";
import {
  HomeIcon,
  IncomeIcon,
  ExpenseIcon,
  TransferIcon,
  StatisticIcon,
  SigInIcon,
  LoginIcon,
} from "components/Icons/Icons";
import { NavList, Link, NavListItem } from "./SharedLayout.styled";
import { theme } from "theme/theme";

const SharedLayout: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <NavList>
        <NavListItem>
          <Link to="/">
            <HomeIcon color={theme.colors.light} />
            Головна
          </Link>
        </NavListItem>
        {!isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/register">
                <SigInIcon color={theme.colors.light} />
                Реєстрація
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/login">
                <LoginIcon color={theme.colors.light} />
                Вхід
              </Link>
            </NavListItem>
          </>
        )}

        {isLoggedIn && (
          <>
            <NavListItem>
              <Link to="/incomes">
                <IncomeIcon color={theme.colors.green} />
                Доходи
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/expenses">
                <ExpenseIcon color={theme.colors.red} />
                Витрати
              </Link>
            </NavListItem>
            <NavListItem>
              <Link to="/transfers">
                <TransferIcon color={theme.colors.transfers} />
                Перекази
              </Link>
            </NavListItem>
            <NavListItem>
              <Link
                to="/statistics"
                style={{ pointerEvents: "none", opacity: 0.5 }}
              >
                <StatisticIcon color={theme.colors.valid} />
                Статистика <span style={{ fontSize: "7px" }}>в розробці</span>
              </Link>
            </NavListItem>
          </>
        )}
      </NavList>
      <Outlet></Outlet>
    </>
  );
};

export default SharedLayout;
