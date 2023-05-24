import { DocumentData, DocumentReference } from "firebase/firestore";
import convertObjToDoc from "~/lib/firebase/convertObjToDoc";
import { getCollection, getDocument, updateDocument } from "~/lib/firebase/rest";
import { PlannedMeal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (groupId: string, weekId: string, meal: WeekPlan) => {
  const updateMask = Object.keys(meal).map(field => `updateMask.fieldPaths=${field}`).join('&');
  await updateDocument(`groups/${groupId}/weekPlans/${weekId}?${updateMask}`, convertObjToDoc(meal));
};
