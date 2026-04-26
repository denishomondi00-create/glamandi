import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminFrame } from "@/components/glamandi/admin-frame";

export const metadata: Metadata = {
  title: "Glamandi Control Center",
  description: "Admin and staff portal for Glamandi Property Management Operating System.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminFrame>{children}</AdminFrame>;
}
