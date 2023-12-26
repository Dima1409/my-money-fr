import { TransfersHeader } from "./Transfers.styled";
import Keyboard from "components/Keyboard";
import TransfersOperations from "components/HistoryOperations/TransfersOperations";

const Transfers: React.FC = () => {
  return (
    <>
      <TransfersHeader>Мої перекази</TransfersHeader>
      <Keyboard></Keyboard>
      <TransfersOperations></TransfersOperations>
    </>
  );
};

export default Transfers;
