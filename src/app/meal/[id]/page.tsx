import { createIngredient, getMeal } from "~/lib/repository";

import NewIngredientForm from "~/app/_components/new-ingredient-form";

export default async function MealPage({ params }: { params: { id: number } }) {
  const createIngredientWithMealId = createIngredient.bind(null, params.id);
  const meal = await getMeal(params.id);
  console.log(meal);
  return (
    <div>
      <div>Date: {meal.mealTime.toISOString().slice(0, 10)}</div>
      {meal.mealName.length > 0 && <div>Description: {meal.mealName}</div>}
      <div>Type: {meal.mealType}</div>
      <div>Ingredients:</div>
      <ul>
        {meal.ingredientsWithCategories.map((ic) => (
          <li key={ic.id}>
            {ic.categoryName}: {ic.name}
          </li>
        ))}
      </ul>
      <NewIngredientForm updateItemAction={createIngredientWithMealId} />
    </div>
  );
}
