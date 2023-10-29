import { operations, deleteOperation } from "services/api";
import { ISearchOperation } from "types/data";
import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
} from "../AllOperations/AllOperations.styled";
import Loader from "components/Loader";
import { useEffect, useState } from "react";

const OperationsIncome: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>();
  const deleteOp = async (id: string) => {
    await deleteOperation(id);
    const newResult: ISearchOperation[] = await operations();
    const sortedOperations = newResult
      .filter((elem) => elem.add)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    setOperation(sortedOperations);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const operationsIncome: ISearchOperation[] = await operations();
        const result = operationsIncome
          .filter((elem) => elem.add)
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        setOperation(result);
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
              <>
                {add ? (
                  <>
                    <Operation key={_id}>
                      <Marker style={{ backgroundColor: "green" }} />
                      <OperationInfo>
                        <span style={{ fontWeight: 600 }}>{add} грн,</span>
                      </OperationInfo>
                      <OperationInfo>{category},</OperationInfo>
                      {comment ? (
                        <OperationInfo
                          style={{ fontStyle: "italic", color: "teal" }}
                        >
                          {comment}
                        </OperationInfo>
                      ) : null}
                      <OperationInfo>
                        {date.getDate()}.{date.getMonth() + 1},
                      </OperationInfo>
                      <OperationInfo>
                        {date.getHours().toString().padStart(2, "0")}:
                        {date.getMinutes().toString().padStart(2, "0")}:
                        {date.getSeconds().toString().padStart(2, "0")}
                      </OperationInfo>
                      <BtnDelete onClick={() => deleteOp(_id)}>
                        Видалити
                      </BtnDelete>
                    </Operation>
                  </>
                ) : null}
              </>
            );
          })}
    </OperationWrapper>
  );
};
export default OperationsIncome;
