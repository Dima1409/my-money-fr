import { ISearchWallet } from "types/data";
import { newWallet, deleteWallet } from "services/api";
import { useState, FormEvent, ChangeEvent } from "react";

interface WalletsListProps {
  wallets: ISearchWallet[];
}
const initialState = {
  wallet: "",
};

const WalletsList: React.FC<WalletsListProps> = ({ wallets }) => {
  const [formData, setFormData] = useState(initialState);
  // const [walletsList, setWalletsList] = useState<ISearchWallet[]>();
  // const [loading, setLoading] = useState(true);

  // async function getData() {
  //   try {
  //     const result: ISearchWallet[] = await allWallets();
  //     setWalletsList(result);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onDelete = async (id: string) => {
    try {
      await deleteWallet(id);
      console.log(`Wallet with id: ${id} deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  const onRename = async (id: string) => {
    console.log(`Wallet with id:${id} renamed`);
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
          <span style={{ width: "220px" }}>{name}</span>
          <button onClick={() => onDelete(_id)}>видалити</button>
          <button onClick={() => onRename(_id)}>перейменувати</button>
        </div>
      ))}
      <form onSubmit={handleSubmit} style={{ display: "flex", margin: "10px" }}>
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
    </>
  );
};

export default WalletsList;
