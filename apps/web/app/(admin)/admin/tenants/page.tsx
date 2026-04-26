import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";

export const metadata: Metadata = { title: "Tenants | Glamandi Control Center" };

export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Tenants"
      title="Tenants"
      description="Manage tenant records, active balances, notices, receipts, penalties, deposits, utilities, and repairs."
      apiPath="/tenants"
      columns={[
        { key: "firstName", header: "First Name" },
        { key: "lastName", header: "Last Name" },
        { key: "phone", header: "Phone" },
        { key: "email", header: "Email" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Joined" },
      ]}
      rowHref={(row) => `/admin/tenants/${String(row._id)}`}
      primaryAction={{ href: "/admin/tenants/new", label: "New Tenant" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
