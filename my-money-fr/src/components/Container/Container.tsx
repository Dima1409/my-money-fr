import { ReactNode } from "react";
import { ContainerStyles } from "./Container.styled";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <ContainerStyles>{children}</ContainerStyles>;
};

export default Container;
