import { ISearchCategory } from "types/data";
import {
  getAll,
  createNewCategory,
  deleteCategory,
  renameCategory,
} from "../../redux/categories/operations";
import useCategory from "hooks/useCategory";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  EditIcon,
  DeleteIcon,
  DoneIcon,
  CloseIcon,
} from "components/Icons/Icons";
import {
  WalletsContainer,
  WalletsHeader,
  WalletsWrapper,
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
} from "components/WalletsList/WalletsList.styled";
import { categoryPattern } from "utils/patterns";
import { RadioWrapper, InputRadio, LabelSelect } from "./CategoryList.styled";
import Loader from "components/Loader";
import { theme } from "theme/theme";
import Pagination from "components/pagination/Pagination";
import { Slide } from "react-toastify";
import { notifyError, ToastContainer } from "utils/toastify";
import "react-toastify/dist/ReactToastify.css";

interface CategoryListProps {
  categories: ISearchCategory[];
  typeOfCategory: string;
}

const ITEMS_PER_PAGE = 5;

const initialState = {
  name: "",
  type: "",
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  typeOfCategory,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { isLoading } = useCategory();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState(initialState);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState(categories);
  const totalItems = categoryList.length;

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: any
  ) => {
    e.preventDefault();
    dispatchTyped(deleteCategory(id)).then(() => {
      dispatchTyped(getAll());
      const updatedCategories = categories.filter(
        (category) => category._id !== id
      );
      setCategoryList(updatedCategories);
      const totalPages = Math.ceil(updatedCategories.length / ITEMS_PER_PAGE);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchTyped(createNewCategory(formData)).then((res) => {
      if (
        res.payload.response.data.message ===
        `Category with name: ${formData.name} already exist`
      ) {
        return notifyError("Категорія з таким ім'ям вже існує");
      }
      dispatchTyped(getAll());
    });
    setCategoryList(categories);
    setCurrentPage(Math.ceil((totalItems + 1) / ITEMS_PER_PAGE));
    setFormData(initialState);
  };

  const onRename = async () => {
    const id = editingCategoryId || "";
    dispatchTyped(renameCategory({ id, name: formData.name })).then(() =>
      dispatchTyped(getAll())
    );
    setFormData(initialState);
    onClose();
  };

  const onClose = async () => {
    setEditingCategoryId(null);
    setEditing(false);
    setFormData(initialState);
  };

  const startEditing = (id: string) => {
    setEditingCategoryId(id);
    setEditing(true);
    const currentCategory = categories.find((elem) => elem._id === id);
    setFormData({
      name: currentCategory?.name || "",
      type: typeOfCategory,
    });
  };

  return (
    <InfoWallets>
      <ToastContainer transition={Slide} />
      <WalletsHeader>Мої категорії</WalletsHeader>
      {isLoading ? (
        <Loader type="spin" />
      ) : (
        <>
          <Pagination
            totalItems={categories.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
          {currentCategories.map(({ _id, name, type }) => (
            <WalletsContainer key={_id}>
              {editingCategoryId === _id ? (
                <FormEdit autoComplete="off">
                  <label htmlFor="name">
                    <InputCreateNew
                      type="text"
                      name="name"
                      autoFocus
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    ></InputCreateNew>
                  </label>
                  <WalletsWrapper>
                    <BtnRename
                      type="submit"
                      disabled={
                        formData.name === "" ||
                        !categoryPattern.test(formData.name) ||
                        formData.name ===
                          categories.find(
                            (category) => category._id === editingCategoryId
                          )?.name ||
                        categories.some(
                          (category) =>
                            category._id !== editingCategoryId &&
                            category.name === formData.name
                        )
                      }
                      onClick={() => onRename()}
                    >
                      <DoneIcon />
                    </BtnRename>
                    <BtnCloseEdit onClick={() => onClose()}>
                      <CloseIcon />
                    </BtnCloseEdit>
                  </WalletsWrapper>
                </FormEdit>
              ) : (
                <WalletsWrapper>
                  <LabelList
                    style={{
                      color:
                        type === "income"
                          ? theme.colors.valid
                          : theme.colors.darkRed,
                    }}
                  >
                    {name}
                  </LabelList>
                  <BtnDelete onClick={(e) => handleDelete(e, _id)}>
                    <DeleteIcon />
                  </BtnDelete>
                  <BtnEdit onClick={() => _id && startEditing(_id)}>
                    <EditIcon />
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
          <FormCreateNew onSubmit={handleSubmit} autoComplete="off">
            <label>
              <InputCreateNew
                type="text"
                name="name"
                placeholder="Нова категорія..."
                onChange={handleInputChange}
                value={formData.name}
                pattern={categoryPattern.source}
              ></InputCreateNew>
            </label>
            <RadioWrapper>
              <LabelSelect>
                <InputRadio
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === "income"}
                  onChange={handleInputChange}
                />
                Доходи
              </LabelSelect>
              <LabelSelect>
                <InputRadio
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === "expense"}
                  onChange={handleInputChange}
                />
                Витрати
              </LabelSelect>
            </RadioWrapper>

            <BtnSubmit
              type="submit"
              disabled={
                formData.name === "" ||
                formData.type === "" ||
                !categoryPattern.test(formData.name) ||
                categories.some(
                  (category) =>
                    category._id !== editingCategoryId &&
                    category.name.toLowerCase() === formData.name.toLowerCase()
                )
              }
            >
              <DoneIcon color={theme.colors.valid} />
            </BtnSubmit>
          </FormCreateNew>
        </WalletsContainer>
      )}
    </InfoWallets>
  );
};

export default CategoryList;
