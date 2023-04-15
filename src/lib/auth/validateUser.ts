import { RequestEventLoader } from "@builder.io/qwik-city";
import { COOKIE_USER_TOKEN } from "~/lib/auth/consts";
import parseJwt from "~/lib/auth/parseJwt";

export default (request: RequestEventLoader) => {
  const cookie = request.cookie.get(COOKIE_USER_TOKEN);
  if (!cookie) {
    throw new Error("Unauthorized");
  }
  const { groupId } = parseJwt(cookie.value);
  /**
   * @todo Validate expiration and signature
   */
  return { groupId };
};
