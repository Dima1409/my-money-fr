import { operations } from "services/api";
import { ISearchOperation } from "types/data";
import { useEffect, useState } from "react";
import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
} from "../AllOperations/AllOperations.styled";

const OperationsExpenses: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        const operationsExpenses: ISearchOperation[] = await operations();
        const sortedOperations = operationsExpenses
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )
          .filter((elem) => elem.sell);
        setOperation(sortedOperations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <OperationWrapper>
      <OperationsHeader>Історія витрат</OperationsHeader>
      {operation === undefined
        ? null
        : operation.map(({ _id, sell, category, comment }) => {
            return (
              <Operation key={_id}>
                {sell ? (
                  <>
                    <Marker style={{ backgroundColor: "orange" }} />
                    <OperationInfo>
                      Витрата: <span style={{ fontWeight: 600 }}>{sell}</span>
                    </OperationInfo>
                  </>
                ) : null}
                <OperationInfo>Категорія: {category}</OperationInfo>
                <OperationInfo>Коментар: {comment}</OperationInfo>
              </Operation>
            );
          })}
    </OperationWrapper>
  );
};

export default OperationsExpenses;
