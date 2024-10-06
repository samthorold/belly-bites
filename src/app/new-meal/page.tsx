import CreateMealForm from "../_components/create-meal-form";
import { createMealAction } from "~/lib/actions";

export default function NewMealPage() {
  return <CreateMealForm updateItemAction={createMealAction} />;
}
