import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Charges | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Charges" title="Charges"
      description="Rent, utilities, penalties, move-in fees, and other tenant charges with outstanding balances."
      apiPath="/charges"
      columns={[
        { key: "type", header: "Type" },
        { key: "period", header: "Period" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "balance", header: "Balance (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "dueDate", header: "Due Date" },
      ]}
      rowHref={() => `/admin/charges`}
      primaryAction={{ href: "/admin/charges/new", label: "New Charge" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
