import React from "react";
import {
  InfoOperation,
  OperationWrapper,
  Operation,
} from "./Operations.styled";

const Operations: React.FC = () => {
  return (
    <>
      <InfoOperation>Операції</InfoOperation>
      <OperationWrapper>
        <Operation>Доходи</Operation>
        <Operation>Витрати</Operation>
        <Operation>Перекази</Operation>
      </OperationWrapper>
    </>
  );
};

export default Operations;
