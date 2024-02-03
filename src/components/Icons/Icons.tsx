import { IconType } from "react-icons";
import {
  RiDeleteBinLine,
  RiFileListFill,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import {
  AiTwotoneEdit,
  AiOutlineLogout,
  AiOutlineHome,
  AiFillSchedule,
} from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import { MdDoneOutline, MdEditNote, MdAccessibilityNew } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaArrowsRotate,
} from "react-icons/fa6";
import { FaWallet, FaAngleUp } from "react-icons/fa";
import { theme } from "theme/theme";

interface CustomIconProps {
  icon: IconType;
  size?: string;
  color?: string;
}

const defaultSize = window.devicePixelRatio > 1 ? "30" : "25";
const defaultColor = theme.colors.accent;

const CustomIcon: React.FC<CustomIconProps> = ({ icon: Icon, size, color }) => {
  const iconSize = size || defaultSize;
  const iconColor = color || defaultColor;

  return <Icon size={iconSize} color={iconColor} />;
};

const IconWrapper: React.FC<{
  icon: IconType;
  size?: string;
  color?: string;
}> = ({ icon, size, color }) => (
  <CustomIcon icon={icon} size={size} color={color} />
);

const HomeIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiOutlineHome} {...props} />
);

const SigInIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={MdAccessibilityNew} {...props} />
);

const LoginIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={IoMdLogIn} {...props} />
);

const IncomeIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={FaArrowTrendUp} {...props} />
);

const ExpenseIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={FaArrowTrendDown} {...props} />
);

const TransferIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={FaArrowsRotate} {...props} />
);

const StatisticIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiFillSchedule} {...props} />
);

const WalletIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={FaWallet} {...props} />
);

const CategoryIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={RiFileListFill} {...props} />
);

const NoteIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={MdEditNote} {...props} />
);

const AmountIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={RiMoneyDollarCircleLine} {...props} />
);

const DeleteIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={RiDeleteBinLine} {...props} />
);

const EditIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiTwotoneEdit} {...props} />
);

const DoneIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={MdDoneOutline} {...props} />
);

const CloseIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={GrClose} {...props} />
);

const LogOutIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={AiOutlineLogout} {...props} />
);

const TopIcon: React.FC<{ size?: string; color?: string }> = (props) => (
  <IconWrapper icon={FaAngleUp} {...props} />
);

export {
  HomeIcon,
  SigInIcon,
  LoginIcon,
  IncomeIcon,
  ExpenseIcon,
  TransferIcon,
  StatisticIcon,
  WalletIcon,
  CategoryIcon,
  NoteIcon,
  AmountIcon,
  DeleteIcon,
  EditIcon,
  DoneIcon,
  CloseIcon,
  LogOutIcon,
  TopIcon,
};
