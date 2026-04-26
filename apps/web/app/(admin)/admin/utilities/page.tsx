import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Utilities | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Utilities" title="Utility Charges"
      description="Water, electricity, and other utility charges — billing periods, amounts, and payment status."
      apiPath="/utilities"
      columns={[
        { key: "type", header: "Utility" },
        { key: "period", header: "Period" },
        { key: "units", header: "Units" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Date" },
      ]}
      rowHref={() => `/admin/utilities`}
      primaryAction={{ href: "/admin/utilities/new", label: "New Utility Charge" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
