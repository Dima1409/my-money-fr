import { ReactNode } from "react";
import { MainHeader, HeaderWrapper } from "./Header.styled";
// import Container from "components/Container";

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
