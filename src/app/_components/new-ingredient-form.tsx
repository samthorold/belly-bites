import { getCategories } from "~/lib/repository";

export default async function NewIngredientForm({
  updateItemAction,
}: {
  updateItemAction: (formData: FormData) => void;
}) {
  return (
    <div className="form-container">
      <form action={updateItemAction}>
        <label className="form-label">
          Category:
          <select
            name="categoryId"
            className="form-input"
            defaultValue=""
            required
          >
            <option value="">Select a category</option>
            {(await getCategories()).map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="ingredientName"
            className="form-input"
            required
          />
        </label>
        <button type="submit" className="form-button">
          Add
        </button>
      </form>
    </div>
  );
}
