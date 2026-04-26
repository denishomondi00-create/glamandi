import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Unit | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Units"
      title="Unit Details"
      apiPath={`/units/${id}`}
      fields={[
        { key: "unitLabel", label: "Label" }, { key: "unitNumber", label: "Number" },
        { key: "type", label: "Type" }, { key: "bedrooms", label: "Bedrooms" },
        { key: "bathrooms", label: "Bathrooms" },
        { key: "rentAmount", label: "Rent (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "depositAmount", label: "Deposit (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", label: "Status" }, { key: "lockStatus", label: "Lock Status" },
      ]}
      tabs={[
        { label: "Details", href: `/admin/units/${id}` },
        { label: "Current Tenant", href: `/admin/units/${id}/tenant` },
        { label: "Charges", href: `/admin/units/${id}/charges` },
        { label: "Repairs", href: `/admin/units/${id}/repairs` },
        { label: "Location", href: `/admin/units/${id}/location` },
      ]}
      primaryAction={{ href: `/admin/units/${id}`, label: "Edit" }}
      secondaryAction={{ href: "/admin/units", label: "All Units" }}
    />
  );
}
