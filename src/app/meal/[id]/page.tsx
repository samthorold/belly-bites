import { createIngredientAction } from "~/lib/actions";

import MealDetail from "~/app/_components/meal-detail";

export default async function MealPage({ params }: { params: { id: number } }) {
  const mealId = Number(params.id);
  const createIngredientActionWithMealId = createIngredientAction.bind(
    null,
    mealId,
  );
  return (
    <MealDetail
      meal_id={params.id}
      updateItemAction={createIngredientActionWithMealId}
    />
  );
}
