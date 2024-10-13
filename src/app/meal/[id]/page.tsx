import { createIngredientAction } from "~/lib/actions";
import { getMeal } from "~/lib/repository";

import MealDetail from "~/app/_components/meal-detail";

export default async function MealPage({ params }: { params: { id: number } }) {
  const mealId = Number(params.id);
  const createIngredientActionWithMealId = createIngredientAction.bind(
    null,
    mealId,
  );
  const meal = await getMeal(params.id);
  console.log(meal);
  return (
    <MealDetail
      meal={meal}
      updateItemAction={createIngredientActionWithMealId}
    />
  );
}
