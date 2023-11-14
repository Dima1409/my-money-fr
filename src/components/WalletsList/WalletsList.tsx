import { ISearchWallet } from "types/data";

interface WalletsListProps {
  wallets: ISearchWallet[];
}

const WalletsList: React.FC<WalletsListProps> = ({ wallets }) => (
  <>
    <h2>Мої гаманці</h2>
    {wallets.map(({ _id, name }) => (
      <div style={{ display: "flex" }} key={_id}>
        <span style={{ width: "220px" }}>{name}</span>
        <button
          onClick={() =>
            console.log(`delete wallet with id:${_id} and name: ${name}`)
          }
        >
          видалити
        </button>
        <button
          onClick={() =>
            console.log(`rename wallet with id:${_id} and name: ${name}`)
          }
        >
          перейменувати
        </button>
      </div>
    ))}
    <button style={{ display: "block", margin: "0 auto" }}>
      додати новий гаманець
    </button>
  </>
);

export default WalletsList;
