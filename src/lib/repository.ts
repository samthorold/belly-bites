"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "../lib/db";
import { ingredients, meals } from "../lib/db/schema";

const ingredientSchema = z.object({
  categoryId: z.number(),
  name: z.string(),
});

const mealSchema = z.object({
  userId: z.string().min(1, "User ID cannot be empty"),
  mealType: z.string().min(1, "Meal type cannot be empty"),
  mealTime: z.string().min(1, "Meal time cannot be empty"),
  mealName: z.string(),
});

export async function createMeal(formData: FormData) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!formData) throw new Error("No body");
  const rawFormData = {
    userId: user.userId,
    mealTime: formData.get("mealTime"),
    mealType: formData.get("mealType"),
    mealName: formData.get("mealName") ?? "",
  };
  console.log(rawFormData);
  const validatedData = mealSchema.parse(rawFormData);
  console.log(validatedData);
  const modelData = {
    userId: validatedData.userId,
    mealType: validatedData.mealType,
    mealTime: new Date(validatedData.mealTime),
    mealName: validatedData.mealName,
  };
  console.log(modelData);
  const newMeals = await db.insert(meals).values(modelData).returning();
  if (!newMeals[0]) throw new Error("createNewMeal: Error creating new meal.");
  const newMeal = newMeals[0];
  console.log(newMeal);
  redirect(`/meal/${newMeal.id}`);
}

export async function getMeal(mealId: number) {
  const meal = await db.query.meals.findFirst({
    where: (model, { eq }) => eq(model.id, mealId),
  });
  if (!meal) throw new Error(`Meal [${mealId}] not found`);
  const ingredients = await db.query.ingredients.findMany({
    where: (model, { eq }) => eq(model.mealId, mealId),
  });
  if (!ingredients) throw new Error(`No ingredients found`);
  const ingredientsWithCategories = [];
  for (const ingredient of ingredients) {
    const maybeCategory = await db.query.categories.findFirst({
      where: (model, { eq }) => eq(model.id, ingredient.categoryId),
    });
    ingredientsWithCategories.push({
      ...ingredient,
      categoryName: maybeCategory ? maybeCategory.name : "",
    });
  }
  return { ...meal, ingredientsWithCategories };
}

export async function getCategories() {
  const categories = await db.query.categories.findMany();
  if (!categories) throw new Error("getCategories: No categories found");
  return categories;
}

export async function createIngredient(mealId: number, formData: FormData) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  if (!formData) throw new Error("No body");
  const rawFormData = {
    categoryId: Number(formData.get("categoryId")),
    name: formData.get("ingredientName"),
  };
  console.log(rawFormData);
  const validatedData = ingredientSchema.parse(rawFormData);
  console.log(validatedData);
  const ingredient = await db
    .insert(ingredients)
    .values({
      ...validatedData,
      mealId,
    })
    .returning();
  console.log(ingredient);
  redirect(`/meal/${mealId}`);
}
