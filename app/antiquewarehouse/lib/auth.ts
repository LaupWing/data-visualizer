"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "aw_auth";
const COOKIE_VALUE = "authenticated";

export async function verifyPassword(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string } | null> {
  const password = formData.get("password") as string;
  const expected = process.env.ANTIQUEWAREHOUSE_PASSWORD;

  if (!expected) {
    return { error: "Password not configured on server." };
  }

  if (password !== expected) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/antiquewarehouse",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return null;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}
