import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Penalty Exceptions | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Penalties / Exceptions" title="Penalty Exceptions"
      description="Tenants with communication exceptions or waiver decisions for penalty rules."
      apiPath="/penalties"
      columns={[
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" }, { key: "reason", header: "Reason" }, { key: "created_at", header: "Date" },
      ]}
      primaryAction={{ href: "/admin/penalties", label: "All Penalties" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
