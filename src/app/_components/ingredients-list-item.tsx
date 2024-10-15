"use client";

import { deleteIngredientAction } from "~/lib/actions";

export default function IngredientsListItem({
  ingredient,
}: {
  ingredient: {
    categoryName: string;
    mealId: number;
    categoryId: number;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
  };
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
