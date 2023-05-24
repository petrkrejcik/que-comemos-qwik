import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import Login from "~/components/login/Login";
import { COOKIE_USER_TOKEN } from "~/lib/auth/consts";
import { useUser } from "~/lib/user/user";
import validateToken from "~/lib/user/validateToken";

export interface userData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
}

export const onRequest: RequestHandler = async (request) => {
  try {
    await validateToken(request.cookie.get(COOKIE_USER_TOKEN)?.value || "");
    if (request.url.pathname === "/login/") {
      throw request.redirect(302, "/");
    }
  } catch (e) {
    // noop
  }
};

export default component$(() => {
  const user = useUser();
  const nav = useNavigate();

  useVisibleTask$(({ track }) => {
    track(() => user.isLogged);
    if (user.isLogged) {
      nav("/");
    }
  });

  return (
    <div class={"flex justify-center items-center h-screen"}>
      <Login />
    </div>
  );
});
