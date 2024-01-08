import { ReactNode } from "react";
import { MainHeader, HeaderWrapper } from "./Header.styled";

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <MainHeader>
        <HeaderWrapper>
          {children}
        </HeaderWrapper>
    </MainHeader>
  );
};

export default Header;
