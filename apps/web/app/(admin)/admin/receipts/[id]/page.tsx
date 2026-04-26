import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Receipt | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Receipts"
      title="Receipt"
      apiPath={`/receipts/${id}`}
      fields={[
        { key: "receiptNumber", label: "Receipt Number" },
        { key: "amount", label: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", label: "Status" },
        { key: "issuedAt", label: "Issued At" },
        { key: "pdfUrl", label: "PDF URL" },
      ]}
      primaryAction={{ href: `/admin/receipts/${id}`, label: "Download PDF" }}
      secondaryAction={{ href: "/admin/receipts", label: "All Receipts" }}
    />
  );
}
