import styled from "styled-components";
import Slider from "react-slick";
import { theme } from "theme/theme";

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
  & > div > div {
    display: flex;
    justify-content: space-between;
    & div {
      margin: 0 2px;
      min-height: 50px;
      & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }
  }
  & > ul > li.slick-active > button::before {
    color: ${(props) => props.theme.accent};
    opacity: 1;
  }
  & > ul > li > button::before {
    color: ${(props) => props.theme.accent};
    opacity: 0.45;
    font-size: 12px;
  }
  & > ul {
    position: static;
    margin-bottom: 8px;
  }
`;

const Wallet = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding: 8px;
  margin: 10px 0;
  background-color: ${theme.colors.valid};
  border-radius: ${theme.radii.small};
  color: ${theme.colors.light};
  font-family: ${theme.fonts.open_sans};
  font-size: ${theme.fontSizes.normal};
`;

const WalletResult = styled.div`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSizes.bold};
`;

export { InfoWallets, SliderWrapper, Wallet, WalletResult };
