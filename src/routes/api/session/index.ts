import type { RequestEvent } from "@builder.io/qwik-city";
import auth from "~/lib/firebase/auth.server";

export const onPost = async (request: RequestEvent) => {
  console.log("🛎 ", "session create");
  const body = (await request.parseBody()) as { idToken?: string };
  const idToken = body.idToken;
  if (!idToken) {
    console.log("🛎 ", "neni token");
    request.json(400, { status: "error", error: "Missing session cookie. Try relogging in." });
    return;
  }
  console.log("🛎 ", "jedu");
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
    request.cookie.set("customSession", sessionCookie, options);
    request.json(200, { status: "success" });
  } catch (error) {
    console.log('🛎 ', 'chyba', error);
    request.json(400, { status: "error", error: "Unauthorized" });
  }
};
