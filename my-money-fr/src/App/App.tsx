import React, { useEffect } from "react";
import { startPage } from "services/api";
import Header from "components/Header";
import Operations from "components/Operations";
import Keyboard from "components/Keyboard";
// import Wallet from "components/Wallet";
import Wallets from "components/Wallets";
import Container from "components/Container";
// import logo from '../../src/assets/logo.svg';

function App() {
  useEffect(() => {
    const getData = async () => {
      const res = await startPage();
      console.log(res);
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
    </Container>
  );
}

export default App;
