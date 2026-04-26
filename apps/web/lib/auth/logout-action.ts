"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieNames } from "./cookies";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(authCookieNames.accessToken);
  cookieStore.delete(authCookieNames.refreshToken);
  cookieStore.delete(authCookieNames.role);
  redirect("/login");
}
