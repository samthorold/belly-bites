import { z } from "zod";

export const newMealSchema = z.object({
  userId: z.string().min(1, "User ID cannot be empty"),
  mealType: z.string().min(1, "Meal type cannot be empty"),
  mealTime: z
    .string()
    .min(1, "Meal time cannot be empty")
    .transform((val) => {
      const parsed = new Date(val);
      if (!parsed) {
        throw new Error(`Invalid date {val}`);
      }
      return parsed;
    }),
  mealName: z.string(),
});

export const ingredientWithCategorySchema = z.object({
  id: z.number(),
  mealId: z.number(),
  categoryId: z.number(),
  categoryName: z.string().min(1, "Category name cannot be empty"),
  name: z.string().min(1, "Name cannot be empty"),
  createdAt: z
    .string()
    .min(1, "Created at cannot be empty")
    .transform((val) => {
      const parsed = new Date(val);
      if (!parsed) {
        throw new Error(`Invalid date {val}`);
      }
      return parsed;
    }),
  updatedAt: z
    .string()
    // .min(1, "Updated at cannot be empty")
    .transform((val) => {
      const parsed = new Date(val);
      if (!parsed) {
        return null;
      }
      return parsed;
    }),
});

export const newIngredientSchema = z.object({
  mealId: z.number(),
  categoryId: z
    .string()
    .min(1, "Category ID cannot be empty")
    .transform((val) => {
      const parsed = parseInt(val, 10);
      if (isNaN(parsed)) {
        throw new Error(`Invalid number {val}`);
      }
      return parsed;
    }),
  name: z.string().min(1, "Name cannot be empty"),
});

export type NewMeal = z.infer<typeof newMealSchema>;
export type NewIngredient = z.infer<typeof newIngredientSchema>;
export type IngredientWithCategory = z.infer<
  typeof ingredientWithCategorySchema
>;
