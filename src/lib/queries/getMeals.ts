import { getCollection, getDocument } from "~/lib/firebase/rest";
import { Meal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (groupId: string) => {
  const collection = await getCollection<Meal>(`groups/${groupId}/meals`);

  return collection;
};
