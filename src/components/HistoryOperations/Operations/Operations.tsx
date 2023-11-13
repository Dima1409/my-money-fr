import { useState, useEffect } from "react";
import { operations, deleteOperation } from "services/api";
import { ISearchOperation } from "types/data";
import Loader from "components/Loader";
import {
  OperationWrapper,
  Operation,
  Marker,
  OperationInfo,
  BtnDelete,
} from "./Operations.styled";

interface OperationsProps {
  type: boolean;
}

const HistoryOperations: React.FC<OperationsProps> = ({ type }) => {
  const [operationsData, setOperationsData] = useState<ISearchOperation[]>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const result: ISearchOperation[] = await operations();
      const sortedOperations = result
        .filter((elem) => elem.type === type)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      setOperationsData(sortedOperations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteOperation(id);
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OperationWrapper>
        {loading && <Loader type="spin" color="teal" />}
        {operationsData &&
          operationsData.map(
            ({ _id, amount, type, category, comment, createdAt, wallet }) => {
              const date = new Date(createdAt);
              return (
                <Operation key={_id}>
                  <Marker style={{ backgroundColor: type ? "green" : "red" }} />
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
