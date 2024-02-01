import React from "react";
import Operations from "components/HistoryOperations/Operations";
import TransfersForm from "components/Forms/TransfersForm";
import { ISearchOperation } from "types/data";
import useOperations from "hooks/useOperations";
import useWallets from "hooks/useWallets";
import Loader from "components/Loader";
import { TransfersHeader } from "./Transfers.styled";

const Transfers: React.FC = () => {
  const { operations } = useOperations();
  const { isLoading: walletsLoading, wallets } = useWallets();

  const transferOperations: ISearchOperation[] = operations.filter(
    (elem: ISearchOperation) => !elem.type
  );

  const sortedTransferOperations = transferOperations.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <>
        <TransfersHeader>Перекази</TransfersHeader>
        {walletsLoading ? (
          <Loader type="spin" />
        ) : (
          <>
            {wallets ? <TransfersForm></TransfersForm> : <div>Error page</div>}
          </>
        )}
        <TransfersHeader>Історія переказів</TransfersHeader>
        <Operations operationsType={sortedTransferOperations}></Operations>
      </>
    </>
  );
};

export default Transfers;
