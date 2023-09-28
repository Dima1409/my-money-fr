import React from "react";
import { InfoWallets, WalletsWrapper, Wallet } from "./Wallets.styled";

const Wallets: React.FC = () => {
  return (
    <>
      <InfoWallets>Гаманці</InfoWallets>
      <WalletsWrapper>
        <Wallet>
          <div>Готівка <span>0</span></div>
        </Wallet>
        <Wallet>
          <div>Карта <span>0</span></div>
        </Wallet>
      </WalletsWrapper>
    </>
  );
};

export default Wallets;
