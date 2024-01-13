import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getAllOperations,
  deleteOperation,
} from "../../../redux/operations/operations";
import useOperations from "hooks/useOperations";
import useAuth from "../../../hooks/useAuth";
import Loader from "components/Loader";
import { ISearchOperation } from "types/data";
import {
  OperationWrapper,
  Operation,
  OperationInfo,
  OperationResult,
  BtnDelete,
} from "../Operations/Operations.styled";
import { theme } from "theme/theme";
import { IconType } from "react-icons";
import { RiDeleteBinLine } from "react-icons/ri";

interface CustomIconProps {
  icon: IconType;
  size?: string;
  color?: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  icon: Icon,
  size = "20px",
  color = `${theme.colors.accent}`,
}) => {
  return <Icon size={size} color={color} />;
};

const HistoryOperations: React.FC = () => {
  const { operations } = useOperations();
  const { isLoggedIn } = useAuth();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [deletingOperation, setDeletingOperation] = useState<string | null>(
    null
  );

  useEffect(() => {
    dispatchTyped(getAllOperations());
  }, [dispatchTyped]);

  const handleDelete = async (id: any) => {
    setDeletingOperation(id);
    dispatchTyped(deleteOperation(id)).then(() => {
      setDeletingOperation(null);
      dispatchTyped(getAllOperations());
    });
  };

  const sortedOperations = [...operations]?.sort(
    (a: ISearchOperation, b: ISearchOperation) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <OperationWrapper>
        {isLoggedIn &&
          sortedOperations &&
          sortedOperations.map(
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
    </>
  );
};
export default HistoryOperations;
