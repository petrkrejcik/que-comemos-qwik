import convertObjToDoc from "~/lib/firebase/convertObjToDoc";
import { updateDocument } from "~/lib/firebase/rest";
import { WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (groupId: string, weekId: string, weekPlan: WeekPlan) => {
  const updateMask = Object.keys(weekPlan).map(field => `updateMask.fieldPaths=${field}`).join('&');
  await updateDocument(`groups/${groupId}/weekPlans/${weekId}?${updateMask}`, convertObjToDoc(weekPlan));
};
