import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Exit Reviews | Deposits | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Deposits / Exit Reviews" title="Exit Reviews"
      description="Pending exit reviews for tenants serving notice — inspect, approve deductions, and process refunds."
      apiPath="/deposits"
      columns={[
        { key: "type", header: "Type" }, { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" }, { key: "created_at", header: "Date" },
      ]}
      primaryAction={{ href: "/admin/deposits", label: "All Deposits" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
