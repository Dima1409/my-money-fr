import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import useOperations from "hooks/useOperations";
import useAuth from "../../../hooks/useAuth";
import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  BtnDelete,
} from "../Operations/Operations.styled";

import { ThunkDispatch } from "redux-thunk";

const HistoryOperations: React.FC = () => {
  const { isLoading, isError, operations } = useOperations();
  const { isLoggedIn } = useAuth();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatchTyped(getAllOperations());
  }, [dispatchTyped]);

  const handleDelete = async (id: any) => {
    dispatchTyped(deleteOperation(id)).then(() =>
      dispatchTyped(getAllOperations())
    );
  };

  return (
    <>
      <OperationWrapper>
        {isError ? <div>Error page</div> : null}
        {isLoading && <Loader type="spin" color="teal" />}
        {isLoggedIn &&
          operations &&
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
                <Operation
                  key={_id}
                  style={{
                    backgroundColor:
                      type === "income" ? "lightgreen" : "tomato",
                  }}
                >
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
                      <span
                        style={{ textTransform: "uppercase", fontWeight: 600 }}
                      >
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
                  <BtnDelete
                    disabled={isLoading}
                    onClick={() => handleDelete(_id)}
                  >
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
