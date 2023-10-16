import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
} from "./HistoryOperations.styled";
import { useState, useEffect } from "react";
import { ISearchOperation } from "types/data";
import { operations } from "services/api";

const HistoryOperations: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        const res: ISearchOperation[] = await operations();
        const sortedOperations = res.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setOperation(sortedOperations);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <OperationWrapper>
      <OperationsHeader>Історія операцій</OperationsHeader>
      {operation === undefined
        ? null
        : operation.map(({ _id, add, sell, category, comment }) => {
            return (
              <Operation key={_id}>
                {add ? (
                  <>
                    <Marker style={{ backgroundColor: "green" }} />
                    <OperationInfo>
                      Дохід: <span style={{ fontWeight: 600 }}>{add}</span>
                    </OperationInfo>
                  </>
                ) : null}
                {sell ? (
                  <>
                    <Marker style={{ backgroundColor: "red" }} />
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

export default HistoryOperations;
