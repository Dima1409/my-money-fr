import { useEffect } from "react";
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
  const { isLoading, operations } = useOperations();
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
                    <Loader type="spin" />
                  ) : (
                    <BtnDelete onClick={() => handleDelete(_id)}>
                      <CustomIcon icon={RiDeleteBinLine}></CustomIcon>
                    </BtnDelete>
                  )}
                </Operation>
              );
            }
          )}
      </OperationWrapper>
    </>
  );
};
export default HistoryOperations;
