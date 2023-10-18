import Header from "components/Header";
import Operations from "components/Operations";
import Wallets from "components/Wallets";
import HistoryOperations from "components/HistoryOperations/AllOperations";

const HomePage: React.FC = () => {
  return (
    <>
      <Header>
        <span>My Finance</span>
      </Header>
      <Operations></Operations>
      <Wallets></Wallets>
      <HistoryOperations></HistoryOperations>
    </>
  );
};

export default HomePage;