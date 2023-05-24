import { server$ } from "@builder.io/qwik-city";
import { COOKIE_USER_TOKEN } from "~/lib/auth/consts";
import validateToken from "~/lib/user/validateToken";

export default server$(async function () {
  const cookie = this.cookie.get(COOKIE_USER_TOKEN);
  if (!cookie) {
    throw new Error("Unauthorized");
  }

  const { groupId } = validateToken(cookie.value);
  return { groupId };
});
