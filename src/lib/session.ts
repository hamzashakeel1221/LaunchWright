// Edge-safe session helpers (used by middleware and server code).
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "cometfront_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

/**
 * Signing key = SHA-256 of SESSION_SECRET plus DATABASE_URL (both secret settings on the host).
 * Mixing in DATABASE_URL keeps the key strong even if SESSION_SECRET is short.
 */
let cachedKey: Promise<Uint8Array> | null = null;
function secretKey() {
  if (!cachedKey) {
    const material = `${process.env.SESSION_SECRET ?? ""}|${process.env.DATABASE_URL ?? ""}`;
    if (material.length < 33) throw new Error("Set SESSION_SECRET (and DATABASE_URL) in the host's environment settings");
    cachedKey = crypto.subtle
      .digest("SHA-256", new TextEncoder().encode(material))
      .then((buf) => new Uint8Array(buf));
  }
  return cachedKey;
}

export async function createSessionToken(email: string) {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(await secretKey());
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, await secretKey());
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
