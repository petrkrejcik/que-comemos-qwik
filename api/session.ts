import type { VercelRequest, VercelResponse } from "@vercel/node";
// import admin from "./_getFirebaseAdmin";
import { serialize } from "cookie";

export default function handler(request: VercelRequest, response: VercelResponse) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 10);
  const cookie = serialize("ck", "value", {
    httpOnly: true,
    path: "/",
    expires,
    secure: true,
  });
  response.status(200).setHeader("Set-Cookie", [cookie]).json({ query: request.query.token });
  // admin
  // const serviceAccount = JSON.parse(import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY as string);
  // const body = (await request.parseBody()) as { idToken?: string };
  // const idToken = body.idToken;
  // if (!idToken) {
  //   console.log("🛎 ", "neni token");
  //   request.json(400, { status: "error", error: "Missing session cookie. Try relogging in." });
  //   return;
  // }
  // console.log('🛎 ', 'idToken', idToken);
  // // const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // try {
  //   //   const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
  //   //   const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
  //   //   request.cookie.set("customSession", sessionCookie, options);
  //   response.json(200, { status: "success" });
  // } catch (error) {
  //   console.log("🛎 ", "chyba", error);
  //   response.json(400, { status: "error", error: "Unauthorized" });
  // }
}
