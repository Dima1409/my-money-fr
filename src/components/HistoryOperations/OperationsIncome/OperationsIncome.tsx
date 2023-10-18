import { operations } from "services/api";
import { ISearchOperation } from "types/data";
import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
} from "../AllOperations/AllOperations.styled";
import { useEffect, useState } from "react";

const OperationsIncome: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>();
  useEffect(() => {
    const getData = async () => {
      try {
        const operationsIncome: ISearchOperation[] = await operations();
        const sortedOperations = operationsIncome
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
      <OperationsHeader>Історія доходів</OperationsHeader>
      {operation === undefined
        ? null
        : operation.map(({ _id, add, category, comment }) => {
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
                <OperationInfo>Категорія: {category}</OperationInfo>
                <OperationInfo>Коментар: {comment}</OperationInfo>
              </Operation>
            );
          })}
    </OperationWrapper>
  );
};
export default OperationsIncome;
