import type { RequestEvent } from "@builder.io/qwik-city";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";
import { COOKIE_USER_TOKEN } from "~/lib/auth/consts";
import getJwtSecret from "~/lib/auth/getJwtSecret";
import parseJwt from "~/lib/auth/parseJwt";

export const onPost = async (request: RequestEvent) => {
  const body = await request.parseBody();
  if (
    typeof body !== "object" ||
    !body ||
    !(body as Record<string, string>).idToken
  ) {
    request.json(400, { error: "Invalid request" });
    return;
  }
  const idToken = (body as Record<string, string>).idToken;
  const { groupId, userId } = parseJwt(idToken);
  const token = await new SignJWT({ groupId, userId })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("10d")
    .sign(new TextEncoder().encode(getJwtSecret()));

  request.cookie.set(COOKIE_USER_TOKEN, token, {
    httpOnly: true,
    path: "/",
    maxAge: [10, "days"],
  });
  request.json(200, { status: "ok" });
};
