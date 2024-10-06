import { z } from "zod";

import { db } from "./db";
import { meals } from "./db/schema";

export const newMealSchema = z.object({
  userId: z.string().min(1, "User ID cannot be empty"),
  mealType: z.string().min(1, "Meal type cannot be empty"),
  mealTime: z.string().min(1, "Meal time cannot be empty"),
  mealName: z.string(),
});

type NewMeal = z.infer<typeof newMealSchema>;

export async function createMeal(newMeal: NewMeal) {
  const data = {
    userId: newMeal.userId,
    mealType: newMeal.mealType,
    mealTime: new Date(newMeal.mealTime),
    mealName: newMeal.mealName,
  };
  const newRecords = await db.insert(meals).values(data).returning();
  if (!newRecords[0]) throw new Error("Error creating new meal.");
  return newRecords[0];
}
