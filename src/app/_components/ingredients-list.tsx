// Can this be split into two components?
// One for the list and one for the item?
// The list component would be a server side component and fetch the data
// The item component would be a client side component and render the data
// with the delete button

import { getIngredientsWithCategories } from "~/lib/repository";
import IngredientsListItem from "./ingredients-list-item";

export default async function IngredientsList({
  meal_id,
}: {
  meal_id: number;
}) {
  const ingredientsWithCategories = await getIngredientsWithCategories(meal_id);
  return (
    <ul className="ingredient-list">
      {ingredientsWithCategories.map((ic) => (
        <IngredientsListItem key={ic.id} ingredient={ic} />
      ))}
    </ul>
  );
}
