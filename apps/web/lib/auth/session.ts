import { cookies } from "next/headers";

export type SessionUser = { id: string; name: string; email: string; role: "admin" | "staff" | "tenant" | "landlord" };
export type Session = { user: SessionUser; accessToken: string } | null;

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(padded, "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<Session> {
  const cookieStore = await cookies();
  const token = cookieStore.get("glamandi_access_token")?.value;
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  const role = ((payload?.role as string) ?? cookieStore.get("glamandi_role")?.value ?? "staff") as SessionUser["role"];
  const email = (payload?.email as string) ?? "user@glamandi.local";
  const id = (payload?.sub as string) ?? "current";
  const firstName = (payload?.firstName as string) ?? "";
  const lastName = (payload?.lastName as string) ?? "";
  const name = [firstName, lastName].filter(Boolean).join(" ") || email.split("@")[0];

  return { user: { id, name, email, role }, accessToken: token };
}
