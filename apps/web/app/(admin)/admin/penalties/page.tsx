import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Penalties | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Penalties" title="Penalties"
      description="Late rent penalties, waivers, exception decisions, and penalty rule overrides."
      apiPath="/penalties"
      columns={[
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "band", header: "Band" },
        { key: "status", header: "Status" },
        { key: "reason", header: "Reason" },
        { key: "created_at", header: "Created" },
      ]}
      rowHref={() => `/admin/penalties`}
      primaryAction={{ href: "/admin/penalties/manual", label: "Manual Penalty" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
