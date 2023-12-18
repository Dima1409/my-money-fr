import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// import { operations, deleteOperation } from "service/api";
import { getAllOperations } from "../../../redux/operations/operations";
import useSelectors from "../../../hooks/useOperations";
import useAuth from "../../../hooks/useAuth";
import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import {
  OperationWrapper,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
} from "../Operations/Operations.styled";

import { ThunkDispatch } from 'redux-thunk';

const HistoryOperations: React.FC = () => {
  // const [operationsData, setOperationsData] = useState<ISearchOperation[]>();

  const { isLoading, isError, operations } = useSelectors();
  console.log("OPERATIONS", operations);
  const { isLoggedIn } = useAuth();
  // const dispatch = useDispatch();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatchTyped(getAllOperations());
  }, [dispatchTyped]);

  return (
    <>
      <OperationWrapper>
        {isLoading && <Loader type="spin" color="teal" />}
        {isLoggedIn && operations &&
          operations.map(
            ({ _id, amount, type, category, comment, createdAt, wallet }: ISearchOperation) => {
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
                  {/* <BtnDelete
                    disabled={isLoading}
                    onClick={() => handleDelete(_id)}
                  >
                    Видалити
                  </BtnDelete> */}
                </Operation>
              );
            }
          )}
      </OperationWrapper>
    </>
  );
};
export default HistoryOperations;

// const getData = async () => {
//   try {
//     const result: ISearchOperation[] = await getAllOperations();
//     const sortedOperations = result.sort(
//       (a, b) =>
//         new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
//     );
//     setOperationsData(sortedOperations);
//   } catch (error) {
//     console.log(error);
//   }
// };


  // const handleDelete = async (id: string) => {
  //   setLoading(true);
  //   await deleteOperation(id);
  //   getData();
  //   setLoading(false);
  // };