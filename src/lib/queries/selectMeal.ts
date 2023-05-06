import { DocumentData, DocumentReference } from "firebase/firestore";
import convertObjToDoc from "~/lib/firebase/convertObjToDoc";
import { getCollection, getDocument, saveDocument } from "~/lib/firebase/rest";
import { Meal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";

export default async (groupId: string, weekId: string, meal: WeekPlan) => {
  await saveDocument(`groups/${groupId}/weekPlans/${weekId}`, {
    ...convertObjToDoc(meal),
  });
};
