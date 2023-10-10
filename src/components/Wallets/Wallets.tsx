import React from "react";
import { InfoWallets, WalletsWrapper, Wallet } from "./Wallets.styled";
import { ISearchWallet } from "types/data";
import { useEffect, useState } from "react";
import { wallets } from "services/api";

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
        {wall === undefined
          ? null
          : wall.map(({ _id, name, total }) => {
              return (
                <Wallet key={_id}>
                  {name}:
                  {total}
                </Wallet>
              );
            })}
      </WalletsWrapper>
    </>
  );
};

export default Wallets;
