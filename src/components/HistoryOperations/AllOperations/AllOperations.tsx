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
} from "../Operations/Operations.styled";

const HistoryOperations: React.FC = () => {
  const [operationsData, setOperationsData] = useState<ISearchOperation[]>();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const result: ISearchOperation[] = await operations();
      const sortedOperations = result.sort(
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
    setLoading(true);
    await deleteOperation(id);
    getData();
    setLoading(false);
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
            ({ _id, amount, type, category, comment, createdAt }) => {
              const date = new Date(createdAt);
              return (
                <Operation key={_id}>
                  <Marker style={{ backgroundColor: type ? "green" : "red" }} />
                  <OperationInfo>
                    <span style={{ fontWeight: 600 }}>{amount} грн,</span>
                  </OperationInfo>
                  <OperationInfo style={{ textTransform: "uppercase" }}>
                    {category},
                  </OperationInfo>
                  {comment && (
                    <OperationInfo
                      style={{ fontStyle: "italic", color: "teal" }}
                    >
                      {comment},
                    </OperationInfo>
                  )}
                  <OperationInfo>
                    {date.getDate()}.{date.getMonth() + 1},
                  </OperationInfo>
                  <OperationInfo>
                    {date.getHours().toString().padStart(2, "0")}:
                    {date.getMinutes().toString().padStart(2, "0")}:
                    {date.getSeconds().toString().padStart(2, "0")}
                  </OperationInfo>
                  <BtnDelete disabled={loading} onClick={() => handleDelete(_id)}>
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
