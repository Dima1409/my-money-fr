import Header from "components/Header";
import Operations from "components/Operations";
import Wallets from "components/Wallets";
import AllOperations from "components/HistoryOperations/AllOperations";

const HomePage: React.FC = () => {
  return (
    <>
      <Header>
        <span>Мої гроші</span>
      </Header>
      <Operations></Operations>
      <Wallets></Wallets>
      <AllOperations />
    </>
  );
};

export default HomePage;
