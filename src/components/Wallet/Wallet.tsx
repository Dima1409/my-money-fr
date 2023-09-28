import React, { ReactNode } from "react";
import { Select } from "./Wallet.styled";

interface SelectProps {
  children: ReactNode;
}

const Wallet: React.FC<SelectProps> = ({ children }) => {
  return <Select>{children}</Select>;
};

export default Wallet;