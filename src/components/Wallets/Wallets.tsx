import React from "react";
import { InfoWallets, WalletsWrapper, Wallet } from "./Wallets.styled";
import { ISearchWallet } from "types/data";
import { useEffect } from "react";
import Loader from "components/Loader";
import { useDispatch } from "react-redux";
import { getAllWallets } from "../../redux/wallets/operations";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useWallets from "hooks/useWallets";

const Wallets: React.FC = () => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading, isError, wallets } = useWallets();

  useEffect(() => {
    dispatchTyped(getAllWallets());
  }, [dispatchTyped]);

  return (
    <>
      <InfoWallets>Гаманці</InfoWallets>

      <WalletsWrapper>
        {isError ? <div>Error page</div> : null}
        {isLoading && <Loader type="spin" color="teal"></Loader>}
        {wallets.map(({ _id, name, total }: ISearchWallet) => {
          return (
            <Wallet key={_id}>
              {name}:{total}
            </Wallet>
          );
        })}
      </WalletsWrapper>
    </>
  );
};

export default Wallets;
