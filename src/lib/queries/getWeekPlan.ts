import { getDocument } from "~/lib/firebase/rest";
import { WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (weekId: string, groupId: string) => {
  try {
    const doc = await getDocument<WeekPlan>(`groups/${groupId}/weekPlans/${weekId}`);
    return doc;
  } catch (e) {
    console.error(e);
    return {}
  }
};
