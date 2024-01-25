import styled from "styled-components";
import Slider from "react-slick";
import { theme } from "theme/theme";

const WalletsWrapper = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.radii.normal};
`;

const InfoWallets = styled.p`
  text-align: center;
  color: ${theme.colors.accent};
  font-family: ${theme.fonts.merriweather};
  font-size: ${theme.fontSizes.extraBold};
  margin: 10px 0;
`;

const SliderWrapper = styled(Slider)`
  margin: 0 1px;
  font-weight: ${theme.fontWeight.normal};
  & > div > div > div {
    border-radius: ${theme.radii.normal};
    & > div > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    & > div {
      display: flex;
      justify-content: space-between;
      text-align: center;
      align-items: center;
      color: red;
      margin: 0 2px;
    }
  }
  & > ul > li.slick-active > button::before {
    color: ${theme.colors.accentActive};
    opacity: 1;
  }
  & > ul > li > button::before {
    color: ${theme.colors.accent};
    opacity: 0.45;
    font-size: 12px;
  }
  & > ul {
    position: static;
    margin-bottom: 8px;
  }
`;

const Wallet = styled.div`
  && {
    border: 1px solid ${theme.colors.light};
    border-radius: ${theme.radii.normal};
    background-color: ${theme.colors.accent};
    min-height: 50px;
    color: ${theme.colors.light};
    padding: 10px 0;
    margin-bottom: 10px;
    & > div {
      font-size: ${theme.fontSizes.small};
    }
  }
`;

const SumWallets = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 8px;
  margin: 10px auto;
  background-color: ${theme.colors.accent};
  border-radius: ${theme.radii.small};
  color: ${theme.colors.light};
  font-family: ${theme.fonts.open_sans};
  font-size: ${theme.fontSizes.small};
  max-width: 320px;
  ${theme.mq.tablet} {
    margin: 10px 0 10px auto;
    max-width: 400px;
  }
`;

const WalletResult = styled.div`
  margin: 4px;
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.normal};
`;

export {
  WalletsWrapper,
  InfoWallets,
  SliderWrapper,
  Wallet,
  SumWallets,
  WalletResult,
};
