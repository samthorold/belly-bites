import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import NewMealForm from "../_components/new-meal-form";
import { db } from "../../lib/db";
import { meals } from "../../lib/db/schema";

const mealSchema = z.object({
  userId: z.string().min(1, "User ID cannot be empty"),
  mealTime: z.string().min(1, "Meal time cannot be empty"),
  mealName: z.string(),
});

export default function NewMealPage() {
  async function createNewMeal(formData: FormData) {
    "use server";
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    if (!formData) throw new Error("No body");
    const rawFormData = {
      userId: user.userId,
      mealTime: formData.get("mealTime"),
      mealName: formData.get("mealName") ?? "",
    };
    console.log(rawFormData);
    const validatedData = mealSchema.parse(rawFormData);
    console.log(validatedData);
    const modelData = {
      userId: validatedData.userId,
      mealTime: new Date(validatedData.mealTime),
      mealName: validatedData.mealName,
    };
    const newMeals = await db.insert(meals).values(modelData).returning();
    if (!newMeals[0])
      throw new Error("createNewMeal: Error creating new meal.");
    const newMeal = newMeals[0];
    console.log(newMeal);
  }
  return <NewMealForm updateItemAction={createNewMeal} />;
}
