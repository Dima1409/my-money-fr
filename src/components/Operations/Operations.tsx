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
        <Operation to="/incomes">Доходи</Operation>
        <Operation to="/expenses">Витрати</Operation>
        {/* <Operation to="/transfers">Перекази</Operation> */}
      </OperationWrapper>
    </>
  );
};

export default Operations;
