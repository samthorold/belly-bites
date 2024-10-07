"use client";

import { deleteIngredientAction } from "~/lib/actions";

export default function IngredientsList({
  ingredients,
}: {
  ingredients: {
    categoryName: string;
    mealId: number;
    categoryId: number;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}) {
  return (
    <ul className="ingredient-list">
      {ingredients.map((ic) => (
        <li key={ic.id} className="ingredient-item">
          <span>{ic.categoryName}:</span> <span>{ic.name}</span>{" "}
          <button onClick={() => deleteIngredientAction(ic.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
