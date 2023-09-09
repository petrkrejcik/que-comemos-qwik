import { User } from "firebase/auth";

/** 
 * This function is called when a user is verified on client via Firebase Auth hook.
 */
export default async (user: User) => {
  const idToken = await user.getIdToken();
  const response = await fetch(`/api/auth`, {
    body: JSON.stringify({ idToken }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
};
