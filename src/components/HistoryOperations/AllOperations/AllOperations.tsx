import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
} from "./AllOperations.styled";
import { useState, useEffect } from "react";
import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import { operations, deleteOperation } from "services/api";

const HistoryOperations: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>([]);
  const deleteOp = async (id: string) => {
    await deleteOperation(id);
    const newResult: ISearchOperation[] = await operations();
    const sortedOperations = newResult.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setOperation(sortedOperations);
  };
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
        : operation.map(
            ({ _id, amount, type, category, comment, createdAt }) => {
              const date = new Date(createdAt);

              return (
                <Operation key={_id}>
                  {type ? (
                    <>
                      <Marker style={{ backgroundColor: "green" }} />
                      <OperationInfo>
                        <span style={{ fontWeight: 600 }}>{amount} грн,</span>
                      </OperationInfo>
                    </>
                  ) : null}
                  {!type ? (
                    <>
                      <Marker style={{ backgroundColor: "red" }} />
                      <OperationInfo>
                        <span style={{ fontWeight: 600 }}>{amount} грн,</span>
                      </OperationInfo>
                    </>
                  ) : null}
                  <OperationInfo style={{ textTransform: "uppercase" }}>
                    {category},
                  </OperationInfo>
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
                  <BtnDelete onClick={() => deleteOp(_id)}>Видалити</BtnDelete>
                </Operation>
              );
            }
          )}
    </OperationWrapper>
  );
};
export default HistoryOperations;
