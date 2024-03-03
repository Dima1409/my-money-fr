import React, { useState, ChangeEvent } from "react";
import {
  WalletsWrapper,
  StyledForm,
  StyledLabel,
  StyledInput,
  InfoWallets,
  SliderWrapper,
  Wallet,
  EditSum,
  SumWallets,
  WalletResult,
  SubmitStyled,
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
import { EditIcon, DoneIcon } from "components/Icons/Icons";
import useWallets from "hooks/useWallets";
import { breakpoints, theme } from "theme/theme";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import { walletTotalPattern } from "utils/patterns";

const initialState = {
  id: "",
  total: "",
  name: "",
};

const Wallets: React.FC = () => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading, isError, wallets } = useWallets();
  const { isOpen, close, toggle } = useToggle();
  const [formData, setFormData] = useState(initialState);
  const [initialFormData, setInitialFormData] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const startEditing = (id: string) => {
    const currentWallet: ISearchWallet = wallets.find(
      (elem: any) => elem._id === id
    );
    console.log(currentWallet);
    setFormData({
      id: currentWallet?._id || "",
      total: String(currentWallet?.total) || "",
      name: currentWallet?.name || "",
    });
    setInitialFormData({
      id: currentWallet?._id || "",
      total: String(currentWallet?.total) || "",
      name: currentWallet?.name || "",
    });
  };

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   dispatchTyped(
  //     editWalletById({
  //       id: formData.id,
  //       total: formData.total,
  //     })
  //   ).then(() => dispatchTyped(getAllWallets()));
  //   close();
  // };

  const isSmallScreen = useMediaQuery({
    query: `(max-width: ${breakpoints.tablet}px)`,
  });
  const isMediumScreen = useMediaQuery({
    query: `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop}px)`,
  });
  const isLargeScreen = useMediaQuery({
    query: `(min-width: ${breakpoints.desktop}px)`,
  });

  let slidesToShow = 4;
  let slidesToScroll = 4;

  if (isSmallScreen) {
    slidesToShow = 2;
    slidesToScroll = 2;
  }
  if (isMediumScreen) {
    slidesToShow = 5;
    slidesToScroll = 5;
  } else if (isLargeScreen) {
    slidesToShow = 8;
    slidesToScroll = 8;
  }
  const settings = sliderSettings(
    slidesToShow,
    slidesToScroll,
    true,
    5000,
    false
  );

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
      <WalletsWrapper>
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
                  <WalletResult>{name}:</WalletResult>
                  <WalletResult>{total} грн</WalletResult>
                  <EditSum
                    onClick={() => {
                      startEditing(_id || "");
                      toggle();
                    }}
                  >
                    <EditIcon color={theme.colors.light}></EditIcon>
                  </EditSum>
                </Wallet>
              );
            })
          )}
        </SliderWrapper>
        <SumWallets>
          <WalletResult>Загально:</WalletResult>
          <WalletResult>{totalSum} грн</WalletResult>
        </SumWallets>
      </WalletsWrapper>
      {isOpen && (
        <Modal
          onClick={() => {
            close();
          }}
        >
          <StyledForm autoComplete="off">
            <StyledLabel htmlFor="total">
              Нова сума "{formData.name}:"
              <StyledInput
                onChange={handleInputChange}
                name="total"
                type="number"
                value={formData.total}
              ></StyledInput>
            </StyledLabel>
            <SubmitStyled
              disabled={
                !walletTotalPattern.test(formData.total) ||
                JSON.stringify(formData) === JSON.stringify(initialFormData)
              }
            >
              <DoneIcon color={theme.colors.green}></DoneIcon>
            </SubmitStyled>
          </StyledForm>
        </Modal>
      )}
    </>
  );
};

export default Wallets;
