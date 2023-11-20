import { ISearchWallet } from "types/data";
import { newWallet, deleteWallet, editWalletName } from "services/api";
import { useState, FormEvent, ChangeEvent } from "react";

interface WalletsListProps {
  wallets: ISearchWallet[];
}
const initialState = {
  wallet: "",
};

const WalletsList: React.FC<WalletsListProps> = ({ wallets }) => {
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

  const onDelete = async (id: string) => {
    try {
      await deleteWallet(id);
      onClose();
      console.log(`Wallet with id: ${id} deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  const onRename = async (id: string, newName: string) => {
    try {
      await editWalletName(id, newName);
      console.log(`Wallet with id:${id} renamed`);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onClose = async () => {
    setEditingWalletId(null);
    setEditing(false);
    setFormData(initialState);
  };

  const startEditing = (id: string) => {
    setEditingWalletId(id);
    setEditing(true);
    const currentWallet = wallets.find((elem) => elem._id === id);
    setFormData({
      wallet: currentWallet?.name || "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await newWallet(formData);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Мої гаманці</h2>
      {wallets.map(({ _id, name }) => (
        <div style={{ display: "flex" }} key={_id}>
          {editingWalletId === _id ? (
            <>
              <input
                type="text"
                name="wallet"
                value={formData.wallet}
                onChange={handleInputChange}
              ></input>
              <button onClick={() => onRename(_id, formData.wallet)}>
                зберегти
              </button>
              <button onClick={() => onClose()}>закрити</button>
            </>
          ) : (
            <>
              <label style={{ width: "220px" }}>{name}</label>
              <button onClick={() => onDelete(_id)}>видалити</button>
              <button onClick={() => startEditing(_id)}>перейменувати</button>
            </>
          )}
        </div>
      ))}
      {editing ? (
        <div>редагування...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", margin: "10px" }}
        >
          <input
            type="text"
            name="wallet"
            placeholder="new wallet..."
            value={formData.wallet}
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
