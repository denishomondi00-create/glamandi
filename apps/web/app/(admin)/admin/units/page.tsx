import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Units | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Units" title="Units"
      description="View all units across properties — rent amounts, occupancy status, lock status, and tenant assignment."
      apiPath="/units"
      columns={[
        { key: "unitLabel", header: "Label" }, { key: "unitNumber", header: "Number" },
        { key: "type", header: "Type" }, { key: "bedrooms", header: "Beds" },
        { key: "rentAmount", header: "Rent (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" }, { key: "lockStatus", header: "Lock" },
      ]}
      rowHref={(row) => `/admin/units/${String(row._id)}`}
      primaryAction={{ href: "/admin/units/new", label: "New Unit" }}
      secondaryAction={{ href: "/admin/properties", label: "Properties" }}
    />
  );
}
