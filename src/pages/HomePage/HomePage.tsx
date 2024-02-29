import UserMenu from "components/UserMenu";
import useAuth from "hooks/useAuth";
import Wallets from "../../components/Wallets";
import AllOperations from "components/HistoryOperations/AllOperations";
import { Link } from "components/SharedLayout/SharedLayout.styled";
import { HeaderWelcome, Description } from "./HomePage.styled";
import { theme } from "theme/theme";
import SliderWelcome from "components/SliderWelcome";
import Loader from "components/Loader";

const HomePage: React.FC = () => {
  const { isLoggedIn, isRefreshing, user } = useAuth();
  const isDataLoaded = !isRefreshing && (isLoggedIn || user);
  return (
    <>
      {isDataLoaded ? (
        isLoggedIn && user ? (
          <>
            <UserMenu />
            <Wallets />
            <AllOperations />
          </>
        ) : (
          <>
            <HeaderWelcome>Вітаємо в менеджері фінансів</HeaderWelcome>
            <Description>
              Зареєструвати{" "}
              <Link
                style={{
                  display: "inline-block",
                  margin: "0",
                  padding: "0",
                  color: `${theme.colors.accentActive}`,
                  textDecoration: "underline",
                }}
                to="/register"
              >
                новий
              </Link>{" "}
              обліковий запис або{" "}
              <Link
                to="/login"
                style={{
                  display: "inline-block",
                  margin: "0",
                  padding: "0",
                  color: `${theme.colors.accentActive}`,
                  textDecoration: "underline",
                }}
              >
                увійти
              </Link>{" "}
              в існуючий
            </Description>
            <SliderWelcome />
          </>
        )
      ) : (
        <Loader type="spin" color={theme.colors.spinner}></Loader>
      )}
    </>
  );
};

export default HomePage;
