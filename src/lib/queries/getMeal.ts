import { getDocument } from "~/lib/firebase/rest";
import { Meal } from "~/types";

export default async (groupId: string, mealId: string) => {
  const meal = await getDocument<Meal>(`groups/${groupId}/meals/${mealId}`);
  return meal;
};
