import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Landlords | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Landlords" title="Landlords"
      description="Manage landlord accounts, bank details, properties, statements, and payouts."
      apiPath="/landlords"
      columns={[
        { key: "firstName", header: "First Name" }, { key: "lastName", header: "Last Name" },
        { key: "phone", header: "Phone" }, { key: "email", header: "Email" },
        { key: "status", header: "Status" }, { key: "created_at", header: "Joined" },
      ]}
      rowHref={(row) => `/admin/landlords/${String(row._id)}`}
      primaryAction={{ href: "/admin/landlords/new", label: "New Landlord" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
