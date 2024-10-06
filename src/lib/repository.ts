import { z } from "zod";

import { db } from "./db";
import { ingredients, meals } from "./db/schema";

export const newMealSchema = z.object({
  userId: z.string().min(1, "User ID cannot be empty"),
  mealType: z.string().min(1, "Meal type cannot be empty"),
  mealTime: z.string().min(1, "Meal time cannot be empty"),
  mealName: z.string(),
});

export const newIngredientSchema = z.object({
  mealId: z.number(),
  categoryId: z.string().min(1, "Category ID cannot be empty"),
  name: z.string().min(1, "Name cannot be empty"),
});

type NewMeal = z.infer<typeof newMealSchema>;
type NewIngredient = z.infer<typeof newIngredientSchema>;

export async function createMeal(newMeal: NewMeal) {
  // TODO: do coersion with schema .transform
  const data = {
    ...newMeal,
    mealTime: new Date(newMeal.mealTime),
  };
  const newRecords = await db.insert(meals).values(data).returning();
  if (!newRecords[0]) throw new Error("Error creating new meal.");
  return newRecords[0];
}

export async function createIngredient(newIngredient: NewIngredient) {
  // TODO: do coersion with schema .transform
  const data = {
    ...newIngredient,
    categoryId: Number(newIngredient.categoryId),
  };
  const newRecords = await db.insert(ingredients).values(data).returning();
  if (!newRecords[0]) throw new Error("Error creating new ingredient.");
  return newRecords[0];
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
