import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Property | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Properties"
      title="Property Details"
      apiPath={`/properties/${id}`}
      fields={[
        { key: "name", label: "Property Name" }, { key: "slug", label: "Slug" },
        { key: "managementType", label: "Management Type" }, { key: "status", label: "Status" },
        { key: "listingStatus", label: "Listing Status" }, { key: "created_at", label: "Created" },
      ]}
      tabs={[
        { label: "Details", href: `/admin/properties/${id}` },
        { label: "Units", href: `/admin/properties/${id}/units` },
        { label: "Location", href: `/admin/properties/${id}/location` },
        { label: "Listing", href: `/admin/properties/${id}/listing` },
      ]}
      primaryAction={{ href: `/admin/properties/${id}`, label: "Edit" }}
      secondaryAction={{ href: "/admin/properties", label: "All Properties" }}
    />
  );
}
