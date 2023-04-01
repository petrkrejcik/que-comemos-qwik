import { getFirestore } from "firebase-admin/firestore";
import { getFirebaseAdmin } from "~/lib/firebase/getFirebaseAdmin.server";

export default async (weekId: string, groupId: string) => {
  try {
    const result = await getFirestore(getFirebaseAdmin()).doc(`groups/${groupId}/weekPlans/${weekId}`);
    const doc = await result.get();
    if (!doc.exists) {
      return {};
    }
    return doc.data();
  } catch (e) {
    console.log("🛎 ", "errrrrr", e);
    return {};
  }
};
