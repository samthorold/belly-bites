import { db } from "./db";
import { ingredients, meals } from "./db/schema";
import { eq } from "drizzle-orm";
import { type NewIngredient, type NewMeal } from "./schema";

export async function createMeal(data: NewMeal) {
  const newRecords = await db.insert(meals).values(data).returning();
  if (!newRecords[0]) throw new Error("Error creating new meal.");
  return newRecords[0];
}

export async function createIngredient(data: NewIngredient) {
  const newRecords = await db.insert(ingredients).values(data).returning();
  if (!newRecords[0]) throw new Error("Error creating new ingredient.");
  return newRecords[0];
}

export async function deleteIngredient(id: number) {
  const deleted = await db
    .delete(ingredients)
    .where(eq(ingredients.id, id))
    .returning();
  if (!deleted[0]) throw new Error("Error deleting ingredient.");
  return deleted[0];
}

export async function getMeal(mealId: number) {
  const meal = await db.query.meals.findFirst({
    where: (model, { eq }) => eq(model.id, mealId),
  });
  if (!meal) throw new Error(`Meal [${mealId}] not found.`);
  return meal;
}

export async function getIngredientsWithCategories(mealId: number) {
  const ingredients = await db.query.ingredients.findMany({
    where: (model, { eq }) => eq(model.mealId, mealId),
  });
  // if (!ingredients) throw new Error(`No ingredients found`);
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
  return ingredientsWithCategories;
}

export async function listCategories() {
  const categories = await db.query.categories.findMany();
  if (!categories) throw new Error("No categories found.");
  return categories;
}
