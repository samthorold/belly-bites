import NewMealForm from "../_components/new-meal-form";
import { createMeal } from "~/lib/repository";

export default function NewMealPage() {
  return <NewMealForm updateItemAction={createMeal} />;
}
