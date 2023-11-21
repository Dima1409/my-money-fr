import { ISearchCategory } from "types/data";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import {
  createCategory,
  deleteCategory,
  renameCategory,
} from "../../services/api";

interface CategoryListProps {
  categories: ISearchCategory[];
  typeOfCategory: string;
}
const initialState = {
  category: "",
  type: "",
};

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  typeOfCategory,
}) => {
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

  const onDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      onClose();
      console.log(`Category with id: ${id} deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  const onRename = async (id: string, newName: string) => {
    try {
      await renameCategory(id, newName);
    } catch (error) {
      console.log(error);
    }
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
      category: currentCategory?.name || "",
      type: typeOfCategory,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory({
        category: formData.category,
        type: typeOfCategory,
      });
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Мої категорії</h2>
      {categories.map(({ _id, name }) => (
        <div style={{ display: "flex" }} key={_id}>
          {editingCategoryId === _id ? (
            <>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              ></input>
              <button onClick={() => onRename(_id, formData.category)}>
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
            name="category"
            placeholder="new category..."
            value={formData.category}
            onChange={handleInputChange}
          ></input>
          <button type="submit" style={{ display: "block", margin: "0 auto" }}>
            додати нову категорію
          </button>
        </form>
      )}
    </>
  );
};

export default CategoryList;
