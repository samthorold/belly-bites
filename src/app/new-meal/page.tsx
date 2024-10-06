import NewMealForm from "../_components/new-meal-form";
import { createMealAction } from "~/lib/actions";

export default function NewMealPage() {
  return <NewMealForm updateItemAction={createMealAction} />;
}
