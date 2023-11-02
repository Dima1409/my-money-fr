import { operations, deleteOperation } from "services/api";
import { ISearchOperation } from "types/data";
import { useEffect, useState } from "react";
import Loader from "components/Loader";
import {
  OperationWrapper,
  OperationsHeader,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
} from "../AllOperations/AllOperations.styled";

const OperationsExpenses: React.FC = () => {
  const [operation, setOperation] = useState<ISearchOperation[]>();
  const deleteOp = async (id: string) => {
    await deleteOperation(id);
    const newResult: ISearchOperation[] = await operations();
    const sortedOperations = newResult
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .filter((elem) => !elem.type);
    setOperation(sortedOperations);
    setOperation(newResult);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const newResult: ISearchOperation[] = await operations();
        setOperation(newResult);
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
        : operation.map(
            ({ _id, amount, type, category, comment, createdAt }) => {
              const date = new Date(createdAt);
              return (
                <>
                  {!type ? (
                    <>
                      <Operation key={_id}>
                        <Marker style={{ backgroundColor: "orange" }} />
                        <OperationInfo>
                          <span style={{ fontWeight: 600 }}>{amount} грн,</span>
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
                          Час: {date.getHours().toString().padStart(2, "0")}:
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
            }
          )}
    </OperationWrapper>
  );
};

export default OperationsExpenses;
