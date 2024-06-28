// Some TS error when I used `ARRAY_CONTAINS_ANY`
// @ts-nocheck
import { query } from "~/lib/firebase/rest";
import { Meal } from "~/types";

export default async (groupId: string, eatFor?: Array<'lunch' | 'dinner' | 'side-dish'>) => {
  const collection = await query<Meal>(`groups/${groupId}`, {
    from: [
      {
        collectionId: "meals",
      },
    ],
    ...(eatFor && {
      where: {
        fieldFilter: {
          field: {
            fieldPath: "eatFor",
          },
          op: "ARRAY_CONTAINS_ANY",
          value: {
            arrayValue: {
              values: eatFor.map((eatFor) => ({
                stringValue: eatFor,
              })),
            },
          },
        },
      },
    }),
    orderBy: [
      {
        field: {
          fieldPath: "name",
        },
      },
    ],
  });
  return collection;
};
