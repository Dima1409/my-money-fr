import { sliderSettings } from "utils/sliderSettings";
import { SliderInfo, WrapperStyled, ImageStyled } from "./SliderWelcome.styled";
import { SliderWrapper } from "components/Wallets/Wallets.styled";
import useRetinaDisplay from "hooks/useRetina/useRetinaDisplay";
import MainImage from "../../images/desktop/main-page-desktop-min.png";
import IncomePage from "../../images/desktop/income-page-desktop-min.png";
import UserEditModal from "../../images/desktop/user-edit-desktop-min.png";
import CategoryModal from "../../images/desktop/add-category-desktop-min.png";
import WalletModal from "../../images/desktop/add-wallet-desktop-min.png";
import TransferPage from "../../images/desktop/transfer-desktop-min.png";
import History from "../../images/desktop/history-desktop-min.png";
import StatisticPage from "../../images/desktop/statistic-desktop-min.png";
import Device from "../../images/desktop/device-min.png";
import MainImage2x from "../../images/desktop2x/main-page-desktop2x-min.png";
import IncomePage2x from "../../images/desktop2x/income-page-desktop2x-min.png";
import UserEditModal2x from "../../images/desktop2x/user-edit-desktop2x-min.png";
import CategoryModal2x from "../../images/desktop2x/add-category-desktop2x-min.png";
import WalletModal2x from "../../images/desktop2x/add-wallet-desktop2x-min.png";
import TransferPage2x from "../../images/desktop2x/transfer-desktop2x-min.png";
import History2x from "../../images/desktop2x/history-desktop2x-min.png";
import StatisticPage2x from "../../images/desktop2x/statistic-desktop2x-min.png";
import Device2x from "../../images/desktop2x/device2x-min.png";

const SliderWelcome: React.FC = () => {
  const mainImageSrc = useRetinaDisplay(MainImage, MainImage2x);
  const incomeImageSrc = useRetinaDisplay(IncomePage, IncomePage2x);
  const userEditImageSrc = useRetinaDisplay(UserEditModal, UserEditModal2x);
  const categoryImageSrc = useRetinaDisplay(CategoryModal, CategoryModal2x);
  const walletImageSrc = useRetinaDisplay(WalletModal, WalletModal2x);
  const transferImageSrc = useRetinaDisplay(TransferPage, TransferPage2x);
  const historyImageSrc = useRetinaDisplay(History, History2x);
  const statisticImageSrc = useRetinaDisplay(StatisticPage, StatisticPage2x);
  const deviceImageSrc = useRetinaDisplay(Device, Device2x);

  const settings = sliderSettings(1, 1, true, 5000, true);

  return (
    <SliderWrapper {...settings}>
      <WrapperStyled>
        <SliderInfo>Контроль доходів і витрат</SliderInfo>
        <ImageStyled src={mainImageSrc} alt="main page" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Створення та редагування операцій</SliderInfo>
        <ImageStyled src={incomeImageSrc} alt="income page" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Редагування гаманців</SliderInfo>
        <ImageStyled src={walletImageSrc} alt="wallets edit modal" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Редагування категорій</SliderInfo>
        <ImageStyled src={categoryImageSrc} alt="categories edit modal" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Редагування профілю користувача</SliderInfo>
        <ImageStyled src={userEditImageSrc} alt="user edit modal" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Переказ коштів між рахунками</SliderInfo>
        <ImageStyled src={transferImageSrc} alt="transfer page" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Історія операцій з періодами</SliderInfo>
        <ImageStyled src={historyImageSrc} alt="history" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Діаграма статистики за тиждень, місяць, рік</SliderInfo>
        <ImageStyled src={statisticImageSrc} alt="statistic page" />
      </WrapperStyled>
      <WrapperStyled>
        <SliderInfo>Мобільний, планшет або комп'ютер</SliderInfo>
        <ImageStyled src={deviceImageSrc} alt="device" height={200} />
      </WrapperStyled>
    </SliderWrapper>
  );
};

export default SliderWelcome;
