import { TransfersHeader } from "./Transfers.styled";
import TransfersOperations from "components/HistoryOperations/TransfersOperations";

const Transfers: React.FC = () => {
  return (
    <>
      <TransfersHeader>Мої перекази</TransfersHeader>
      <TransfersOperations></TransfersOperations>
    </>
  );
};

export default Transfers;
