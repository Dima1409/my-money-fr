import { useEffect } from "react";
import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import {
  OperationWrapper,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
} from "./Operations.styled";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import useOperations from "hooks/useOperations";

interface OperationsProps {
  type: string;
}

const HistoryOperations: React.FC<OperationsProps> = ({ type }) => {
  const { operations, isLoading, isError } = useOperations();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();

  const handleDelete = async (id: any) => {
    dispatchTyped(deleteOperation(id));
  };

  useEffect(() => {
    dispatchTyped(getAllOperations());
  }, [dispatchTyped]);

  return (
    <>
      <OperationWrapper>
        {isError ? <div>Error page</div> : null}
        {isLoading && <Loader type="spin" color="teal" />}
        {operations &&
          operations.map(
            ({
              _id,
              amount,
              type,
              category,
              comment,
              createdAt,
              wallet,
            }: ISearchOperation) => {
              const date = new Date(createdAt);
              return (
                <Operation key={_id}>
                  <Marker
                    style={{
                      backgroundColor: type === "income" ? "green" : "red",
                    }}
                  />
                  <OperationInfo>
                    сума:{" "}
                    <span
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {amount}
                    </span>
                    ,
                  </OperationInfo>
                  <OperationInfo>
                    гаманець:{" "}
                    <span
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {wallet}
                    </span>
                    ,
                  </OperationInfo>
                  <OperationInfo>
                    категорія:{" "}
                    <span
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {category}
                    </span>
                    ,
                  </OperationInfo>
                  {comment && (
                    <OperationInfo>
                      коментар:{" "}
                      <span style={{ fontStyle: "italic", color: "teal" }}>
                        {comment}
                      </span>
                      ,
                    </OperationInfo>
                  )}
                  <OperationInfo>
                    дата:{" "}
                    <span
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {date.getDate()}.{date.getMonth() + 1}.
                      {date.getFullYear()}
                    </span>
                    ,
                  </OperationInfo>
                  <OperationInfo>
                    час:{" "}
                    <span
                      style={{ textTransform: "uppercase", fontWeight: 600 }}
                    >
                      {date.getHours().toString().padStart(2, "0")}:
                      {date.getMinutes().toString().padStart(2, "0")}:
                      {date.getSeconds().toString().padStart(2, "0")}
                    </span>
                  </OperationInfo>
                  <BtnDelete onClick={() => handleDelete(_id)}>
                    Видалити
                  </BtnDelete>
                </Operation>
              );
            }
          )}
      </OperationWrapper>
    </>
  );
};
export default HistoryOperations;
