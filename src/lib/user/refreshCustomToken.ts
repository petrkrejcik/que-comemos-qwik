import { User } from "firebase/auth";

export default async (user: User) => {
  const idToken = await user.getIdToken();
  const response = await fetch(`/api/auth`, {
    body: JSON.stringify({ idToken }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
};
