import { DocumentData, DocumentReference } from "firebase/firestore";
import convertObjToDoc from "~/lib/firebase/convertObjToDoc";
import { getCollection, getDocument, updateDocument } from "~/lib/firebase/rest";
import { PlannedMeal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (groupId: string, weekId: string, meal: WeekPlan) => {
  await updateDocument(`groups/${groupId}/weekPlans/${weekId}`, convertObjToDoc(meal));
};
