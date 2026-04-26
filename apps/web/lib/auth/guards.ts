import { redirect } from "next/navigation";
import { getCurrentSession } from "./session";

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  return session;
}

export async function requireRole(roles: string[]) {
  const session = await requireSession();
  if (!roles.includes(session.user.role)) redirect("/");
  return session;
}
