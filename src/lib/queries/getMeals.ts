import { getCollection, query } from "~/lib/firebase/rest";
import { Meal } from "~/types";

export default async (groupId: string, eatFor: string) => {
  const collection = await query<Meal>(`groups/${groupId}`, {
    from: [
      {
        collectionId: "meals",
      },
    ],
    where: {
      fieldFilter: {
        field: {
          fieldPath: "eatFor",
        },
        op: "EQUAL",
        value: {
          stringValue: eatFor,
        },
      },
    },
  });
  return collection;
};
