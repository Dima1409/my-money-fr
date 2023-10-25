import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
} from "./AllOperations.styled";
import { useState, useEffect } from "react";
import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import { operations } from "services/api";

const HistoryOperations: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>([]);
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
      {operation ? null : <Loader type="spin" color="teal"></Loader>}
      {operation === undefined
        ? null
        : operation.map(({ _id, add, sell, category, comment, createdAt }) => {
          const date = new Date(createdAt);
          
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
                <OperationInfo>Дата: {date.getDate()}.{date.getMonth()+1}</OperationInfo>
                <OperationInfo>Час: {date.getHours().toString().padStart(2,"0")}:{date.getMinutes().toString().padStart(2,"0")}:{date.getSeconds().toString().padStart(2,"0")}</OperationInfo>
              </Operation>
            );
          })}
    </OperationWrapper>
  );
};

export default HistoryOperations;
