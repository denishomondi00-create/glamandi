import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Deposits | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Deposits" title="Deposits"
      description="Security deposit ledger — collections, refunds, deductions, and exit reviews."
      apiPath="/deposits"
      columns={[
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "type", header: "Type" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Date" },
      ]}
      rowHref={() => `/admin/deposits`}
      primaryAction={{ href: "/admin/deposits/exit-reviews", label: "Exit Reviews" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
