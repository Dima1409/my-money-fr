import { TransfersHeader } from "./Transfers.styled";
import Keyboard from "components/Keyboard";
import GoHomeLink from "components/GoHomeLink";
import TransfersOperations from "components/HistoryOperations/TransfersOperations";

const Transfers: React.FC = () => {
  return (
    <>
      <GoHomeLink></GoHomeLink>
      <TransfersHeader>Мої перекази</TransfersHeader>
      <Keyboard></Keyboard>
      <TransfersOperations></TransfersOperations>
    </>
  );
};

export default Transfers;
