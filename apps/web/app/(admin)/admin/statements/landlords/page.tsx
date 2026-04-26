import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Landlords Statements | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Statements / Landlords" title="Landlords Statements"
      description="Monthly statements for landlords — rent collections, commission, deductions, and net payout."
      apiPath="/statements"
      columns={[
        { key: "period", header: "Period" },
        { key: "grossRent", header: "Gross (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "commission", header: "Commission (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "netPayout", header: "Net (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
      ]}
      primaryAction={{ href: "/admin/statements", label: "All Statements" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
