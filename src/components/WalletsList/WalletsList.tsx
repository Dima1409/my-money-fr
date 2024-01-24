import { ISearchWallet } from "types/data";
import {
  createNewWallets,
  deleteWallet,
  editWallet,
  getAllWallets,
} from "../../redux/wallets/operations";
import useWallets from "hooks/useWallets";
import { useState, ChangeEvent, FormEvent } from "react";
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
  LabelList,
} from "./WalletsList.styled";
import Loader from "components/Loader";
import Pagination from "components/pagination/Pagination";

interface WalletsListProps {
  wallets: ISearchWallet[];
}
const ITEMS_PER_PAGE = 5;
const initialState = {
  name: "",
};

const WalletsList: React.FC<WalletsListProps> = ({ wallets }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentWallets = wallets.slice(indexOfFirstItem, indexOfLastItem);
  const [formData, setFormData] = useState(initialState);
  const { isLoading } = useWallets();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [walletsList, setWalletsList] = useState(wallets);
  const totalItems = walletsList.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: any
  ) => {
    e.preventDefault();
    dispatchTyped(deleteWallet(id)).then(() => {
      dispatchTyped(getAllWallets());
      const updatedWallets = wallets.filter((wallet) => wallet._id !== id);
      setWalletsList(updatedWallets);
      const totalPages = Math.ceil(updatedWallets.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchTyped(createNewWallets(formData)).then(() =>
      dispatchTyped(getAllWallets())
    );
    setWalletsList(wallets);
    setCurrentPage(Math.ceil((totalItems + 1) / ITEMS_PER_PAGE));
    setFormData(initialState);
  };

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        <>
          <Pagination
            totalItems={wallets.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
          {currentWallets.map(({ _id, name }) => (
            <WalletsContainer key={_id}>
              {editingWalletId === _id ? (
                <>
                  <FormEdit autoComplete="off">
                    <label htmlFor="name">
                      <InputCreateNew
                        type="text"
                        name="name"
                        autoFocus
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
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
                  <LabelList>{name.toUpperCase()}</LabelList>
                  <BtnDelete onClick={(e) => handleDelete(e, _id)}>
                    <IconDelete />
                  </BtnDelete>
                  <BtnEdit onClick={() => _id && startEditing(_id)}>
                    <IconEdit />
                  </BtnEdit>
                </WalletsWrapper>
              )}
            </WalletsContainer>
          ))}
        </>
      )}

      {editing ? (
        <WalletsContainer>
          <IsEditing>Редагування...</IsEditing>
        </WalletsContainer>
      ) : (
        <WalletsContainer>
          <FormCreateNew autoComplete="off">
            <LabelName>
              <InputCreateNew
                type="text"
                name="name"
                placeholder="Додати гаманець..."
              ></InputCreateNew>
            </LabelName>

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
