import { ISearchOperation } from "types/data";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
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
import Container from "components/Container";

const Operations: React.FC<any> = ({ operationsType }) => {
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [deletingOperation, setDeletingOperation] = useState<string | null>(
    null
  );

  const handleDelete = async (id: any) => {
    setDeletingOperation(id);
    dispatchTyped(deleteOperation(id)).then(() => {
      setDeletingOperation(null);
      dispatchTyped(getAllOperations());
    });
  };

  return (
    <Container>
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
            const isDeleting = deletingOperation === _id;
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
                className={isDeleting ? "deleting" : ""}
              >
                <OperationInfo>
                  Гаманець: <OperationResult>{wallet}</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Сума: <OperationResult>{amount} грн</OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Категорія: <OperationResult>{category}</OperationResult>
                </OperationInfo>
                {comment && (
                  <OperationInfo>
                    Коментар: <OperationResult>{comment}</OperationResult>
                  </OperationInfo>
                )}
                <OperationInfo>
                  Дата:{" "}
                  <OperationResult>
                    {date.getDate().toString().padStart(2, "0")}.
                    {date.getMonth().toString().padStart(1, "0") + 1}.
                    {date.getFullYear()}
                  </OperationResult>
                </OperationInfo>
                <OperationInfo>
                  Час:{" "}
                  <OperationResult>
                    {date.getHours().toString().padStart(2, "0")}:
                    {date.getMinutes().toString().padStart(2, "0")}:
                    {date.getSeconds().toString().padStart(2, "0")}
                  </OperationResult>
                </OperationInfo>
                <BtnDelete
                  onClick={() => handleDelete(_id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader type="spin" width="30px" height="30px" />
                  ) : (
                    <CustomIcon icon={RiDeleteBinLine}></CustomIcon>
                  )}
                </BtnDelete>
              </Operation>
            );
          }
        )}
      </OperationWrapper>
    </Container>
  );
};
export default Operations;
