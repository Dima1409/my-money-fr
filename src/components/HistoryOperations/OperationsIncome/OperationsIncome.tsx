import { operations } from "services/api";
import { ISearchOperation } from "types/data";
import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
} from "../AllOperations/AllOperations.styled";
import Loader from "components/Loader";
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
      {operation ? null : <Loader type="spin" color="teal"></Loader>}
      {operation === undefined
        ? null
        : operation.map(({ _id, add, category, comment, createdAt }) => {
          const date = new Date(createdAt);
            return (
              <Operation key={_id}>
                {add ? (
                  <>
                    <Marker style={{ backgroundColor: "green" }} />
                    <OperationInfo>
                      <span style={{ fontWeight: 600 }}>{add} грн,</span>
                    </OperationInfo>
                  </>
                ) : null}
                <OperationInfo>{category},</OperationInfo>
                <OperationInfo>{comment},</OperationInfo>
                <OperationInfo>{date.getDate()}.{date.getMonth()+1},</OperationInfo>
                <OperationInfo>{date.getHours().toString().padStart(2,"0")}:{date.getMinutes().toString().padStart(2,"0")}:{date.getSeconds().toString().padStart(2,"0")}</OperationInfo>
              </Operation>
            );
          })}
    </OperationWrapper>
  );
};
export default OperationsIncome;
