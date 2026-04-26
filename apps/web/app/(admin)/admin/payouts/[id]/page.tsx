import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Payout | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Payouts"
      title="Payout Detail"
      apiPath={`/payouts/${id}`}
      fields={[
        { key: "amount", label: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", label: "Status" }, { key: "method", label: "Method" },
        { key: "reference", label: "Reference" }, { key: "notes", label: "Notes" },
        { key: "created_at", label: "Date" },
      ]}
      primaryAction={{ href: `/admin/payouts/${id}`, label: "Update" }}
      secondaryAction={{ href: "/admin/payouts", label: "All Payouts" }}
    />
  );
}
