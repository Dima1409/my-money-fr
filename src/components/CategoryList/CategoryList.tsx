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
import Loader from "components/Loader";

interface CategoryListProps {
  categories: ISearchCategory[];
  typeOfCategory: string;
}
const initialState = {
  name: "",
  type: "",
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  typeOfCategory,
}) => {
  const { isLoading } = useCategory();
  const dispatchTyped = useDispatch<ThunkDispatch<any, any, any>>();
  const [formData, setFormData] = useState(initialState);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editing, setEditing] = useState<boolean>(false);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (id: any) => {
    dispatchTyped(deleteCategory(id)).then(() => dispatchTyped(getAll()));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatchTyped(createNewCategory(formData)).then(() =>
      dispatchTyped(getAll())
    );
    setFormData(initialState);
  };

  const onRename = async () => {
    const id = editingCategoryId || "";
    dispatchTyped(renameCategory({ id, name: formData.name })).then(() =>
      dispatchTyped(getAll())
    );
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
    <>
      <h2>Мої категорії</h2>
      {isLoading ? (
        <Loader type="spin"/>
      ) : (
        categories.map(({ _id, name }) => (
          <div style={{ display: "flex" }} key={_id}>
            {editingCategoryId === _id ? (
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
          <label>
            Категорія
            <input
              type="text"
              name="name"
              placeholder="new category..."
              value={formData.name}
              onChange={handleInputChange}
            ></input>
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="income"
              checked={formData.type === "income"}
              onChange={handleInputChange}
            />
            Income
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="expense"
              checked={formData.type === "expense"}
              onChange={handleInputChange}
            />
            Expense
          </label>

          <button type="submit" style={{ display: "block", margin: "0 auto" }}>
            додати нову категорію
          </button>
        </form>
      )}
    </>
  );
};

export default CategoryList;
