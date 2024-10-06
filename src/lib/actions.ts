import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import {
  newMealSchema,
  createMeal,
  newIngredientSchema,
  createIngredient,
} from "./repository";

// TODO: should auth be here? or userId bound to the action in the component?

export async function createMealAction(formData: FormData) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!formData) throw new Error("No body");
  const validatedData = newMealSchema.parse({
    ...formData.entries(),
    userId: user.userId,
  });
  const newMeal = await createMeal(validatedData);
  redirect(`/meal/${newMeal.id}`);
}

export async function createIngredientAction(
  mealId: number,
  formData: FormData,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!formData) throw new Error("No body");
  const validatedData = newIngredientSchema.parse({
    ...formData.entries(),
    mealId,
  });
  const newIngredient = await createIngredient(validatedData);
  redirect(`/meal/${mealId}`);
}
