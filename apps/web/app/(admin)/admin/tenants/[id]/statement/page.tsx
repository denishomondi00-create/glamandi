import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Statement | Tenant | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminListPage
      eyebrow="Admin / Tenants / Statement"
      title="Account Statement"
      description="Charges, payments, and running balance for this tenant."
      apiPath={`/statements?tenantId=${id}`}
      columns={[
        { key: "period", header: "Period" },
        { key: "grossRent", header: "Charges (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "netPayout", header: "Balance (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
      ]}
      secondaryAction={{ href: `/admin/tenants/${id}`, label: "Back to Profile" }}
    />
  );
}
