import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Payouts | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Payouts" title="Landlord Payouts"
      description="Landlord disbursements — amounts, status, bank reference, and statement linkage."
      apiPath="/payouts"
      columns={[
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "method", header: "Method" },
        { key: "reference", header: "Reference" },
        { key: "created_at", header: "Date" },
      ]}
      rowHref={(row) => `/admin/payouts/${String(row._id)}`}
      primaryAction={{ href: "/admin/payouts", label: "Payouts" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
