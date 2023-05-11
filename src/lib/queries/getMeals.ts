import { getCollection, getDocument } from "~/lib/firebase/rest";
import { PlannedMeal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (groupId: string) => {
  const collection = await getCollection<PlannedMeal>(`groups/${groupId}/meals`);

  return collection;
};
