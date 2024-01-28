import { IconType } from "react-icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiTwotoneEdit, AiOutlineLogout } from "react-icons/ai";
import { MdDoneOutline } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { theme } from "theme/theme";

interface CustomIconProps {
  icon: IconType;
  size?: string;
  color?: string;
}

const defaultSize = window.devicePixelRatio > 1 ? "30" : "15";
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

export { DeleteIcon, EditIcon, DoneIcon, CloseIcon, LogOutIcon };
