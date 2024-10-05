import { createIngredient, getMeal } from "~/lib/repository";

import NewIngredientForm from "~/app/_components/new-ingredient-form";

export default async function MealPage({ params }: { params: { id: number } }) {
  const createIngredientWithMealId = createIngredient.bind(null, params.id);
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
          {meal.ingredientsWithCategories.map((ic) => (
            <li key={ic.id} className="ingredient-item">
              <span>{ic.categoryName}:</span> <span>{ic.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="form-section">
        <NewIngredientForm updateItemAction={createIngredientWithMealId} />
      </div>
    </div>
  );
}
