import { operations } from "services/api";
import { ISearchOperation } from "types/data";
import { useEffect, useState } from "react";
import Loader from "components/Loader";
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
      {operation ? null : <Loader type="spin" color="teal"></Loader>}
      {operation === undefined
        ? null
        : operation.map(({ _id, sell, category, comment, createdAt }) => {
            const date = new Date(createdAt);
            return (
              <Operation key={_id}>
                {sell ? (
                  <>
                    <Marker style={{ backgroundColor: "orange" }} />
                    <OperationInfo>
                      <span style={{ fontWeight: 600 }}>{sell} грн,</span>
                    </OperationInfo>
                  </>
                ) : null}
                <OperationInfo>{category},</OperationInfo>
                <OperationInfo>{comment},</OperationInfo>
                <OperationInfo>
                  {date.getDate()}.{date.getMonth() + 1},
                </OperationInfo>
                <OperationInfo>
                  Час: {date.getHours().toString().padStart(2, "0")}:
                  {date.getMinutes().toString().padStart(2, "0")}:
                  {date.getSeconds().toString().padStart(2, "0")}
                </OperationInfo>
              </Operation>
            );
          })}
    </OperationWrapper>
  );
};

export default OperationsExpenses;
