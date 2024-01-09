import { ISearchOperation } from "types/data";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import useOperations from "hooks/useOperations";
import { theme } from "theme/theme";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  OperationResult,
  BtnDelete,
} from "./Operations.styled";
import Loader from "components/Loader";
import { CustomIcon } from "../AllOperations/AllOperations";
import { RiDeleteBinLine } from "react-icons/ri";

const Operations: React.FC<any> = ({ operationsType }) => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const { isLoading } = useOperations();
  const handleDelete = (id: any) => {
    dispatchTyped(deleteOperation(id)).then(() =>
      dispatchTyped(getAllOperations())
    );
  };

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
                  backgroundColor:
                    type === "income"
                      ? `${theme.colors.green}`
                      : `${theme.colors.red}`,
                }}
              >
                <OperationInfo>
                  Категорія: <OperationResult>{category}</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Гаманець: <OperationResult>{wallet}</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Сума: <OperationResult>{amount} грн</OperationResult>
                </OperationInfo>
                {comment && (
                  <OperationInfo>
                    Коментар: <OperationResult>{comment}</OperationResult>
                  </OperationInfo>
                )}
                <OperationInfo>
                  Дата операції:{" "}
                  <OperationResult>
                    {date.getDate().toString().padStart(2, "0")}.
                    {date.getMonth().toString().padStart(1, "0") + 1}.
                    {date.getFullYear()}
                  </OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Час операції:{" "}
                  <OperationResult>
                    {date.getHours().toString().padStart(2, "0")}:
                    {date.getMinutes().toString().padStart(2, "0")}:
                    {date.getSeconds().toString().padStart(2, "0")}
                  </OperationResult>
                </OperationInfo>
                {isLoading ? (
                  <Loader type="spin"/>
                ) : (
                  <BtnDelete onClick={() => handleDelete(_id)}><CustomIcon icon={RiDeleteBinLine}></CustomIcon></BtnDelete>
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
