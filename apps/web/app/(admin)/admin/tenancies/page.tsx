import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Tenancies | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Tenancies" title="Tenancies"
      description="Active and historical tenancy agreements — rent amounts, billing day, move-in, move-out, and deposit."
      apiPath="/tenancies"
      columns={[
        { key: "status", header: "Status" },
        { key: "rentAmount", header: "Rent (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "depositAmount", header: "Deposit (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "billingDay", header: "Billing Day" },
        { key: "startDate", header: "Start Date" }, { key: "endDate", header: "End Date" },
      ]}
      rowHref={(row) => `/admin/tenancies/${String(row._id)}`}
      primaryAction={{ href: "/admin/tenancies/new", label: "New Tenancy" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
