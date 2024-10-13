import CreateIngredientForm from "~/app/_components/create-ingredient-form";
import IngredientsList from "~/app/_components/ingredients-list";
import type { MealWithIngredientsAndCategories } from "~/lib/repository";

export default function MealDetail({
  meal,
  updateItemAction,
}: {
  meal: MealWithIngredientsAndCategories;
  updateItemAction: (formData: FormData) => void;
}) {
  return (
    <div className="meal-detail-container">
      <div className="meal-header">
        <div>Date: {meal.mealTime.toISOString().slice(0, 10)}</div>
        {meal.mealName.length > 0 && <div>Description: {meal.mealName}</div>}
        <div>Type: {meal.mealType}</div>
      </div>
      <div className="ingredient-section">
        <div>Ingredients:</div>
        <ul className="ingredient-list">
          <IngredientsList ingredients={meal.ingredientsWithCategories} />
        </ul>
      </div>
      <div className="form-section">
        <CreateIngredientForm updateItemAction={updateItemAction} />
      </div>
    </div>
  );
}
