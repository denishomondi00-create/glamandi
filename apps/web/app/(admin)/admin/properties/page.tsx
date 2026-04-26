import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Properties | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Properties" title="Properties"
      description="Manage properties, location details, landlord assignments, listing status, and unit inventory."
      apiPath="/properties"
      columns={[
        { key: "name", header: "Property Name" }, { key: "slug", header: "Slug" },
        { key: "managementType", header: "Type" }, { key: "status", header: "Status" },
        { key: "listingStatus", header: "Listing" }, { key: "created_at", header: "Created" },
      ]}
      rowHref={(row) => `/admin/properties/${String(row._id)}`}
      primaryAction={{ href: "/admin/properties/new", label: "New Property" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
