import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// import { db } from "./db";
// import { ingredients, meals } from "./db/schema";
import { newMealSchema, createMeal } from "./repository";

const ingredientSchema = z.object({
  categoryId: z.number(),
  name: z.string(),
});

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
