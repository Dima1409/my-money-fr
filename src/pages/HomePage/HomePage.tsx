import UserMenu from "components/UserMenu";
import useAuth from "hooks/useAuth";
// import Operations from "components/Operations";
import Wallets from "../../components/Wallets";
import AllOperations from "components/HistoryOperations/AllOperations";

const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
    <div>Вітаємо в менеджері фінансів</div>
      {isLoggedIn && (
        <>
          <UserMenu />
          <Wallets />
          <AllOperations />
        </>
      )}
    </>
  );
};

export default HomePage;
