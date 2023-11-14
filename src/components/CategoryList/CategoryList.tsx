import { ISearchCategoryAdd, ISearchCategorySell } from "types/data";

interface CategoryListProps {
  categoriesAdd: ISearchCategoryAdd[];
  categoriesSell: ISearchCategorySell[];
}
const CategoryList: React.FC<CategoryListProps> = ({
  categoriesAdd,
  categoriesSell,
}) => (
  <>
  <h2>Категорії доходів</h2>
    {categoriesAdd?.[0]?.add.map(({ _id, name }) => (
      <div style={{ display: "flex" }} key={_id}>
        <span style={{ width: "200px" }}>{name}</span>
        <button
          onClick={() =>
            console.log(`delete category with id:${_id} and name: ${name}`)
          }
        >
          видалити
        </button>
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
      <div style={{ display: "flex", justifyContent: "space-between" }} key={_id}>
        <span style={{ width: "200px" }}>{name}</span>
        <button
          onClick={() =>
            console.log(`delete category with id:${_id} and name: ${name}`)
          }
        >
          видалити
        </button>
        <button
          onClick={() =>
            console.log(`rename category with id:${_id} and name: ${name}`)
          }
        >
          перейменувати
        </button>
      </div>
    ))}
    <button style={{ display: "block", margin: "0 auto" }}>
      add new category
    </button>
  </>
);

export default CategoryList;
