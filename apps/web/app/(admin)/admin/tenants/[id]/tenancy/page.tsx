import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Tenancy | Tenant | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminListPage
      eyebrow="Admin / Tenants / Tenancy"
      title="Tenancies"
      description="Active and historical tenancy agreements for this tenant."
      apiPath={`/tenancies?tenantId=${id}`}
      columns={[
        { key: "status", header: "Status" },
        { key: "rentAmount", header: "Rent (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "startDate", header: "Start" }, { key: "endDate", header: "End" },
      ]}
      secondaryAction={{ href: `/admin/tenants/${id}`, label: "Back to Profile" }}
    />
  );
}
