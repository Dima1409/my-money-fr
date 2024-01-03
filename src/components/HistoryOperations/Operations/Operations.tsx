import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  BtnDelete,
  OperationSort,
} from "./Operations.styled";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import useOperations from "hooks/useOperations";

const Operations: React.FC<any> = ({ operationsType }) => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading } = useOperations();

  const handleDelete = (id: any) => {
    dispatchTyped(deleteOperation(id)).then(() =>
      dispatchTyped(getAllOperations())
    );
  };

  // useEffect(() => {
  //   dispatchTyped(getAllOperations());
  // }, [dispatchTyped]);

  return (
    <>
      <OperationWrapper>
        {operationsType.map(
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
              <Operation
                key={_id}
                style={{
                  backgroundColor: type === "income" ? "lightgreen" : "tomato",
                }}
              >
                <OperationInfo>
                  Категорія:
                  <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                    {" "}
                    {category}
                  </span>
                  ,
                </OperationInfo>
                <OperationInfo>
                  Гаманець:
                  <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                    {" "}
                    {wallet}
                  </span>
                  ,
                </OperationInfo>
                <OperationInfo>
                  Сума:
                  <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                    {" "}
                    {amount} грн
                  </span>
                  ,
                </OperationInfo>
                {comment && (
                  <OperationInfo>
                    Коментар:
                    <span style={{ fontStyle: "italic", color: "teal" }}>
                      {" "}
                      {comment}
                    </span>
                    ,
                  </OperationInfo>
                )}
                <OperationInfo>
                  Дата операції:
                  <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                    {" "}
                    {date.getDate().toString().padStart(2, "0")}.
                    {date.getMonth() + 1}.{date.getFullYear()}
                  </span>
                  ,
                </OperationInfo>
                <OperationInfo>
                  Час операції:
                  <span style={{ textTransform: "uppercase", fontWeight: 600 }}>
                    {" "}
                    {date.getHours().toString().padStart(2, "0")}:
                    {date.getMinutes().toString().padStart(2, "0")}:
                    {date.getSeconds().toString().padStart(2, "0")}
                  </span>
                </OperationInfo>
                {isLoading ? (
                  <Loader type="spin" color="teal" />
                ) : (
                  <BtnDelete onClick={() => handleDelete(_id)}>х</BtnDelete>
                )}
              </Operation>
            );
          }
        )}
      </OperationWrapper>
    </>
  );
};
export default Operations;
