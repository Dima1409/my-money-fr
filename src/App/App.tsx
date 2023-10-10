import React, { useEffect } from "react";
import { wallets } from "services/api";
import Header from "components/Header";
import Operations from "components/Operations";
import Keyboard from "components/Keyboard";
import HistoryOperations from "components/HistoryOperations";
// import Wallet from "components/Wallet";
import Wallets from "components/Wallets";
import Container from "components/Container";
// import logo from '../../src/assets/logo.svg';

function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await wallets();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <Container>
      <Header>
        <span>My Finance</span>
      </Header>
      <Operations></Operations>
      <Wallets></Wallets>
      {/* <Wallet>
        <option>Cash</option>
        <option>Card</option>
      </Wallet> */}
      <Keyboard />
      <HistoryOperations></HistoryOperations>
    </Container>
  );
}

export default App;
