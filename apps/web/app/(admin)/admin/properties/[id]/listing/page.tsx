import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Listing | Property | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminListPage
      eyebrow="Admin / Properties / Listing" title="Listing"
      description="Listing for this property."
      apiPath="/units?propertyId=${id}"
      columns={[
        { key: "unitLabel", header: "Label" }, { key: "type", header: "Type" },
        { key: "rentAmount", header: "Rent (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
      ]}
      secondaryAction={{ href: `/admin/properties/${id}`, label: "Back to Property" }}
    />
  );
}
