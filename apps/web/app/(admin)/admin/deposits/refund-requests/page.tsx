import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Refund Requests | Deposits | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Deposits / Refund Requests" title="Refund Requests"
      description="Pending deposit refund requests — eligibility, deduction approval, and disbursement status."
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
