import { removeDocument } from "~/lib/firebase/rest";
import { Meal } from "~/types";

export default async (groupId: string, meal: Meal) => {
  await removeDocument(`groups/${groupId}/meals/${meal.id}`);
};
