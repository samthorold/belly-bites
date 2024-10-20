"use client";

import { deleteIngredientAction } from "~/lib/actions";
import { type IngredientWithCategory } from "~/lib/schema";

export default function IngredientsListItem({
  ingredient,
}: {
  ingredient: IngredientWithCategory;
}) {
  return (
    <li key={ingredient.id} className="ingredient-item">
      <p>
        {ingredient.categoryName}: {ingredient.name}
      </p>
      <button onClick={() => deleteIngredientAction(ingredient.id)}>
        Delete
      </button>
    </li>
  );
}
