import { cookies } from "next/headers";

export type SessionUser = { id: string; name: string; email: string; role: "admin" | "staff" | "tenant" | "landlord" };
export type Session = { user: SessionUser; accessToken?: string } | null;

export async function getCurrentSession(): Promise<Session> {
  const cookieStore = await cookies();
  const token = cookieStore.get("glamandi_access_token")?.value;
  const role = (cookieStore.get("glamandi_role")?.value as SessionUser["role"] | undefined) ?? "staff";
  if (!token) {
    return { user: { id: "demo", name: "Glamandi User", email: "demo@glamandi.local", role }, accessToken: undefined };
  }
  return { user: { id: "current", name: "Glamandi User", email: "user@glamandi.local", role }, accessToken: token };
}
