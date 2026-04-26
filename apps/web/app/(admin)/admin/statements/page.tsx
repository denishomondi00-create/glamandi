import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Statements | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Statements" title="Statements"
      description="Landlord monthly statements — gross rent, commission deductions, repairs, and net payout."
      apiPath="/statements"
      columns={[
        { key: "period", header: "Period" },
        { key: "grossRent", header: "Gross (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "commission", header: "Commission (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "netPayout", header: "Net (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Date" },
      ]}
      rowHref={() => `/admin/statements`}
      primaryAction={{ href: "/admin/statements/landlords", label: "Landlord Statements" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
