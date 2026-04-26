import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Tenancy | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Tenancies"
      title="Tenancy Agreement"
      apiPath={`/tenancies/${id}`}
      fields={[
        { key: "status", label: "Status" },
        { key: "rentAmount", label: "Rent (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "depositAmount", label: "Deposit (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "billingDay", label: "Billing Day" },
        { key: "startDate", label: "Start Date" }, { key: "endDate", label: "End Date" },
        { key: "created_at", label: "Created" },
      ]}
      tabs={[
        { label: "Details", href: `/admin/tenancies/${id}` },
        { label: "Move Out", href: `/admin/tenancies/${id}/move-out` },
        { label: "Notice", href: `/admin/tenancies/${id}/notice` },
        { label: "Transfer", href: `/admin/tenancies/${id}/transfer` },
      ]}
      primaryAction={{ href: `/admin/tenancies/${id}`, label: "Edit" }}
      secondaryAction={{ href: "/admin/tenancies", label: "All Tenancies" }}
    />
  );
}
