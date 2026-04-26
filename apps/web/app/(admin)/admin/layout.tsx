import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminFrame } from "@/components/glamandi/admin-frame";
import { getCurrentSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Glamandi Control Center",
  description: "Admin and staff portal for Glamandi Property Management Operating System.",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  return (
    <AdminFrame userName={session.user.name} userEmail={session.user.email}>
      {children}
    </AdminFrame>
  );
}
