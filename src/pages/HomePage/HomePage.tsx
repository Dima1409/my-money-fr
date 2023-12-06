import Header from "components/Header";
import Operations from "components/Operations";
import Wallets from "components/Wallets";
import AllOperations from "components/HistoryOperations/AllOperations";
import RegisterForm from "components/RegisterForm";

const HomePage: React.FC = () => {
  return (
    <>
      <Header>
        <span>Мої гроші</span>
      </Header>
      <RegisterForm></RegisterForm>
      <Operations></Operations>
      <Wallets></Wallets>
      <AllOperations />
    </>
  );
};

export default HomePage;
