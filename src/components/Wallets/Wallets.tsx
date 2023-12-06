import React from "react";
import { InfoWallets, WalletsWrapper, Wallet } from "./Wallets.styled";
import { ISearchWallet } from "types/data";
import { useEffect, useState } from "react";
import { wallets } from "service/api";
import Loader from "components/Loader";

const Wallets: React.FC = () => {
  const [wall, setWall] = useState<ISearchWallet[] | undefined>();
  useEffect(() => {
    const getData = async () => {
      try {
        const res: ISearchWallet[] = await wallets();
        setWall(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <InfoWallets>Гаманці</InfoWallets>

      <WalletsWrapper>
        {!wall ? <Loader type="spin" color="teal"></Loader> : null}
        {wall === undefined
          ? null
          : wall.map(({ _id, name, total }) => {
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
