import convertObjToDoc from "~/lib/firebase/convertObjToDoc";
import { addDocument } from "~/lib/firebase/rest";
import { Meal } from "~/types";

export default async (groupId: string, meal: Meal) => {
  await addDocument(`groups/${groupId}/meals`, convertObjToDoc({
    ...meal,
    name: meal.name.charAt(0).toUpperCase() + meal.name.slice(1),
  }));
};
