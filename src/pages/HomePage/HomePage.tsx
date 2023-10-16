import Header from "components/Header";
import Operations from "components/Operations";
import Wallets from "components/Wallets";
import Keyboard from "components/Keyboard";
import HistoryOperations from "components/HistoryOperations";

const HomePage: React.FC = () => {
  return (
    <>
      <Header>
        <span>My Finance</span>
      </Header>
      <Operations></Operations>
      <Wallets></Wallets>
      <Keyboard />
      <HistoryOperations></HistoryOperations>
    </>
  );
};

export default HomePage;