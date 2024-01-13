import { ISearchWallet } from "types/data";
import {
  createNewWallets,
  deleteWallet,
  editWallet,
  getAllWallets,
} from "../../redux/wallets/operations";
import useWallets from "hooks/useWallets";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  IconEdit,
  IconOk,
  IconClose,
  IconDelete,
  WalletsContainer,
  WalletsHeader,
  WalletsWrapper,
  LabelName,
  BtnDelete,
  BtnEdit,
  FormEdit,
  FormCreateNew,
  IsEditing,
  BtnSubmit,
  InputCreateNew,
  InfoWallets,
  BtnRename,
  BtnCloseEdit,
} from "./WalletsList.styled";
import Loader from "components/Loader";
import { theme } from "theme/theme";

interface WalletsListProps {
  wallets: ISearchWallet[];
}
const initialState = {
  name: "",
};

const WalletsList: React.FC<WalletsListProps> = ({ wallets }) => {
  const { isLoading } = useWallets();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState(initialState);
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = (id: any) => {
    dispatchTyped(deleteWallet(id)).then(() => dispatchTyped(getAllWallets()));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchTyped(createNewWallets(formData)).then(() =>
      dispatchTyped(getAllWallets())
    );
    setFormData(initialState);
  };

  const onRename = async () => {
    const id = editingWalletId || "";
    dispatchTyped(editWallet({ id, name: formData.name })).then(() =>
      dispatchTyped(getAllWallets())
    );
    onClose();
  };

  const onClose = async () => {
    setEditing(false);
    setEditingWalletId(null);
    setFormData(initialState);
  };

  const startEditing = (id: string) => {
    setEditingWalletId(id);
    setEditing(true);
    const currentWallet = wallets.find((elem) => elem._id === id);
    setFormData({
      name: currentWallet?.name || "",
    });
  };

  return (
    <InfoWallets>
      <WalletsHeader>Мої гаманці</WalletsHeader>
      {isLoading ? (
        <Loader type="spin" />
      ) : (
        wallets.map(({ _id, name }) => (
          <WalletsContainer key={_id}>
            {editingWalletId === _id ? (
              <>
                <FormEdit autoComplete="off">
                  <label>
                    <InputCreateNew
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      autoFocus
                    />
                  </label>
                  <WalletsWrapper>
                    <BtnRename
                      type="submit"
                      disabled={formData.name === ""}
                      onClick={() => onRename()}
                    >
                      <IconOk />
                    </BtnRename>
                    <BtnCloseEdit onClick={() => onClose()}>
                      <IconClose />
                    </BtnCloseEdit>
                  </WalletsWrapper>
                </FormEdit>
              </>
            ) : (
              <WalletsWrapper>
                <LabelName>{name}</LabelName>
                <BtnDelete onClick={() => handleDelete(_id)}>
                  <IconDelete />
                </BtnDelete>
                <BtnEdit onClick={() => _id && startEditing(_id)}>
                  <IconEdit />
                </BtnEdit>
              </WalletsWrapper>
            )}
          </WalletsContainer>
        ))
      )}

      {editing ? (
        <WalletsContainer>
          <IsEditing>Редагування...</IsEditing>
        </WalletsContainer>
      ) : (
        <WalletsContainer>
          <FormCreateNew onSubmit={handleSubmit} autoComplete="off">
            <InputCreateNew
              type="text"
              name="name"
              placeholder="Додати гаманець..."
              value={formData.name}
              onChange={handleInputChange}
            ></InputCreateNew>
            <BtnSubmit type="submit" disabled={formData.name === ""}>
              <IconOk />
            </BtnSubmit>
          </FormCreateNew>
        </WalletsContainer>
      )}
    </InfoWallets>
  );
};

export default WalletsList;
