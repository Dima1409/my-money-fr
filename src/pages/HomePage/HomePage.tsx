import UserMenu from "components/UserMenu";
import useAuth from "hooks/useAuth";
import Wallets from "../../components/Wallets";
import AllOperations from "components/HistoryOperations/AllOperations";

const HomePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <>
          <UserMenu />
          <Wallets />
          <AllOperations />
        </>
      ) : (
        <div style={{ display: isLoggedIn ? "none" : "block" }}>
          Вітаємо в менеджері фінансів
        </div>
      )}
    </>
  );
};

export default HomePage;
