import { createIngredientAction } from "~/lib/actions";
import { getMeal } from "~/lib/repository";

import CreateIngredientForm from "~/app/_components/create-ingredient-form";
import IngredientsList from "~/app/_components/ingredients-list";

export default async function MealPage({ params }: { params: { id: number } }) {
  const mealId = Number(params.id);
  const createIngredientActionWithMealId = createIngredientAction.bind(
    null,
    mealId,
  );
  const meal = await getMeal(params.id);
  console.log(meal);
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
        <CreateIngredientForm
          updateItemAction={createIngredientActionWithMealId}
        />
      </div>
    </div>
  );
}
