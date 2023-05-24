import { CookieValue } from "@builder.io/qwik-city";
import parseJwt from "~/lib/auth/parseJwt";

export default function (token: string) {
  if (!token) {
    throw new Error("Unauthorized");
  }
  const { groupId } = parseJwt(token);
  /**
   * @todo Validate expiration and signature
   */
  return { groupId };
}
