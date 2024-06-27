import convertObjToDoc from "~/lib/firebase/convertObjToDoc";
import { updateDocument } from "~/lib/firebase/rest";
import { Meal } from "~/types";

export default async (groupId: string, meal: Meal) => {
  await updateDocument(`groups/${groupId}/meals/${meal.id}`, convertObjToDoc(meal));
};
