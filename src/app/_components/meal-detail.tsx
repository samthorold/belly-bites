import { Suspense } from "react";
import CreateIngredientForm from "~/app/_components/create-ingredient-form";
import IngredientsList from "~/app/_components/ingredients-list";
import LoadingSkeleton from "./loading";
import { getMeal } from "~/lib/repository";

export default async function MealDetail({
  meal_id,
  updateItemAction,
}: {
  meal_id: number;
  updateItemAction: (formData: FormData) => void;
}) {
  const meal = await getMeal(meal_id);
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
          <Suspense fallback={<LoadingSkeleton />}>
            <IngredientsList meal_id={meal_id} />
          </Suspense>
        </ul>
      </div>
      <div className="form-section">
        <CreateIngredientForm updateItemAction={updateItemAction} />
      </div>
    </div>
  );
}
