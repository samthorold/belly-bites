"use server";

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
  console.log(formData);
  const unvalidatedData = {
    ...Object.fromEntries(formData.entries()),
    userId: user.userId,
  };
  console.log(unvalidatedData);
  const validatedData = newMealSchema.parse(unvalidatedData);
  console.log(validatedData);
  const newMeal = await createMeal(validatedData);
  console.log(newMeal);
  redirect(`/meal/${newMeal.id}`);
}

export async function createIngredientAction(
  mealId: number,
  formData: FormData,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!formData) throw new Error("No body");
  console.log(formData);
  const unvalidatedData = {
    ...Object.fromEntries(formData.entries()),
    mealId,
  };
  console.log(unvalidatedData);
  const validatedData = newIngredientSchema.parse(unvalidatedData);
  console.log(validatedData);
  await createIngredient(validatedData);
  redirect(`/meal/${mealId}`);
}
