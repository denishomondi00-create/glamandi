import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Repairs | Tenant | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminListPage
      eyebrow="Admin / Tenants / Repairs"
      title="Repairs"
      description="Repairs for this tenant — fetched from the API filtered by tenant ID."
      apiPath="/repairs?tenantId=${id}"
      columns={[
        { key: "type", header: "Type" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Date" },
      ]}
      secondaryAction={{ href: `/admin/tenants/${id}`, label: "Back to Profile" }}
    />
  );
}
