import React from "react";
import {
  InfoWallets,
  SliderWrapper,
  Wallet,
  WalletResult,
} from "./Wallets.styled";
import { ISearchWallet } from "types/data";
import { useMediaQuery } from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderSettings } from "utils/sliderSettings";
import { useEffect } from "react";
import Loader from "components/Loader";
import { useDispatch } from "react-redux";
import { getAllWallets } from "../../redux/wallets/operations";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useWallets from "hooks/useWallets";
import { breakpoints } from "theme/theme";

const Wallets: React.FC = () => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading, isError, wallets } = useWallets();

  const isSmallScreen = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet}px)`,
  });
  const isLargeScreen = useMediaQuery({
    query: `(max-width: ${breakpoints.desktop}px)`,
  });

  let slidesToShow = 4;
  let slidesToScroll = 4;

  if (isSmallScreen) {
    slidesToShow = 3;
    slidesToScroll = 3;
  } else if (isLargeScreen) {
    slidesToShow = 7;
    slidesToScroll = 4;
  }
  const settings = sliderSettings(slidesToShow, slidesToScroll);

  useEffect(() => {
    dispatchTyped(getAllWallets());
  }, [dispatchTyped]);

  let totalSum = 0;
  if (wallets && wallets.length > 0) {
    totalSum = wallets.reduce(
      (acc: number, wallet: ISearchWallet) => acc + (wallet.total ?? 0),
      0
    );
  }

  return (
    <>
      <InfoWallets>Гаманці</InfoWallets>
      <SliderWrapper {...settings}>
        {isError && <div>Page error</div>}
        {isLoading ? (
          <Loader type="spin"></Loader>
        ) : (
          wallets &&
          !isError &&
          wallets.map(({ _id, name, total }: ISearchWallet) => {
            return (
              <Wallet key={_id}>
                <div>{name}:</div>
                <WalletResult>{total}</WalletResult>
              </Wallet>
            );
          })
        )}
      </SliderWrapper>
      <Wallet>
        Загально:<WalletResult>{totalSum}</WalletResult>
      </Wallet>
    </>
  );
};

export default Wallets;
