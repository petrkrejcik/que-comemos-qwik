import { RequestEventLoader } from "@builder.io/qwik-city";
import { getAuth } from "firebase-admin/auth";
import { getFirebaseAdmin } from "~/lib/firebase/getFirebaseAdmin.server";

export default async ({ cookie }: RequestEventLoader) => {
  const sessionCookie = cookie.get("customSession")?.value;
  if (!sessionCookie) {
    throw new Error("No session cookie");
  }
  const token = await getAuth(getFirebaseAdmin()).verifySessionCookie(sessionCookie, false /** checkRevoked */);
  const groupId = token.groupId;
  if (!groupId) {
    throw new Error("Group ID not found in token");
  }
  return { groupId };
};
