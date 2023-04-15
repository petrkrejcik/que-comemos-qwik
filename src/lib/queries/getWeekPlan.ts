import getDocumentRest from "~/lib/firebase/getDocumentRest";

export default async (weekId: string, groupId: string) => {
  const doc = await getDocumentRest(`groups/${groupId}/weekPlans/${weekId}`);

  return doc;
};
