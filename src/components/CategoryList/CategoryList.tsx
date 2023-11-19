import { ISearchCategoryAdd, ISearchCategorySell } from "types/data";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { createCategory, deleteCategory } from "../../services/api";

interface CategoryListProps {
  categoriesAdd: ISearchCategoryAdd[];
  categoriesSell: ISearchCategorySell[];
}
const initialState = {
  category: "",
};

const CategoryList: React.FC<CategoryListProps> = ({
  categoriesAdd,
  categoriesSell,
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteCategory(id);
      console.log(`Wallet with id: ${id} deleted`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Категорії доходів</h2>
      {categoriesAdd?.[0]?.add.map(({ _id, name }) => (
        <div style={{ display: "flex" }} key={_id}>
          <span style={{ width: "200px" }}>{name}</span>
          <button onClick={() => onDelete(_id)}>видалити</button>
          <button
            onClick={() =>
              console.log(`rename category with id:${_id} and name: ${name}`)
            }
          >
            перейменувати
          </button>
        </div>
      ))}
      <h2>Категорії витрат</h2>
      {categoriesSell?.[1]?.sell.map(({ _id, name }) => (
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          key={_id}
        >
          <span style={{ width: "200px" }}>{name}</span>
          <button onClick={() => onDelete(_id)}>видалити</button>
          <button
            onClick={() =>
              console.log(`rename category with id:${_id} and name: ${name}`)
            }
          >
            перейменувати
          </button>
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
            додати новий гаманець
          </button>
        </form>
      )}
    </>
  );
};

export default CategoryList;
