import UserMenu from "components/UserMenu";
import useAuth from "hooks/useAuth";
import Wallets from "../../components/Wallets";
import AllOperations from "components/HistoryOperations/AllOperations";
import { Link } from "components/SharedLayout/SharedLayout.styled";
import {
  HeaderWelcome,
  WrapperStyled,
  SliderInfo,
  Description,
} from "./HomePage.styled";
import { theme } from "theme/theme";
// import mainImage from "../../images/mainPage.png";
// import AddOperation from "../../images/addOperationDesktop.png";
import { sliderSettings } from "utils/sliderSettings";
import { SliderWrapper } from "components/Wallets/Wallets.styled";

const HomePage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const settings = sliderSettings(1, 1, true, 5000, true);
  return (
    <>
      {isLoggedIn && user && (
        <>
          <UserMenu />
          <Wallets />
          <AllOperations />
        </>
      )}
      {!isLoggedIn && (
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
          <SliderWrapper {...settings}>
            <WrapperStyled>
              <SliderInfo>
                Доступ до особистого журналу ваших доходів і витрат
              </SliderInfo>
              {/* <img src={mainImage} alt="main page" height={200} /> */}
            </WrapperStyled>
            <WrapperStyled>
              <SliderInfo>
                Зручне додавання, видалення та редагування операцій
              </SliderInfo>
              {/* <img src={AddOperation} alt="operations page" height={200} /> */}
            </WrapperStyled>

            <SliderInfo>
              Можливість додавати нові гаманці, категорії доходів або витрат
            </SliderInfo>
            <SliderInfo>
              Редагування особистої інформації профілю користувача
            </SliderInfo>
            <SliderInfo>Зручна функція переказу коштів між картами</SliderInfo>
            <SliderInfo>
              Історія операцій з можливістю вибору періоду
            </SliderInfo>
            <SliderInfo>
              Статистика доходів і витрат в діаграмі за тиждень, місяць, рік
            </SliderInfo>
          </SliderWrapper>
        </>
      )}
    </>
  );
};

export default HomePage;
