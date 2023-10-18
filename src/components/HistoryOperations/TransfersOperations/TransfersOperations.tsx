import { operations } from "services/api";
import { ISearchOperation } from "types/data";
import {
  OperationWrapper,
  OperationsHeader,
  Operation,
} from "../AllOperations/AllOperations.styled";
import { useEffect, useState } from "react";

const TransfersOperations: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        const operationsTransfers: ISearchOperation[] = await operations();
        const sortedOperations = operationsTransfers
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .filter((elem) => elem.add);
        setOperation(sortedOperations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <OperationWrapper>
      <OperationsHeader>Історія переказів</OperationsHeader>
      {operation === undefined
        ? null
        : operation.map(({ _id, category, comment }) => {
            return (
              <Operation>
                
              </Operation>
            );
          })}
    </OperationWrapper>
  );
};
export default TransfersOperations;
