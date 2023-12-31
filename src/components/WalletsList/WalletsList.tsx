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
import Loader from "components/Loader";

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
    <>
      <h2>Мої гаманці</h2>
      {isLoading ? (
        <Loader type="spin"/>
      ) : (
        wallets.map(({ _id, name }) => (
          <div style={{ display: "flex" }} key={_id}>
            {editingWalletId === _id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                ></input>
                <button onClick={() => onRename()}>зберегти</button>
                <button onClick={() => onClose()}>закрити</button>
              </>
            ) : (
              <>
                <label style={{ width: "220px" }}>{name}</label>
                <button onClick={() => handleDelete(_id)}>видалити</button>
                <button onClick={() => _id && startEditing(_id)}>
                  перейменувати
                </button>
              </>
            )}
          </div>
        ))
      )}

      {editing ? (
        <div>редагування...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", margin: "10px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="new wallet..."
            value={formData.name}
            onChange={handleInputChange}
          ></input>
          <button type="submit" style={{ display: "block", margin: "0 auto" }}>
            додати новий гаманець
          </button>
        </form>
      )}
    </>
  );
};

export default WalletsList;
