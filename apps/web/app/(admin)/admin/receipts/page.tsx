import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Receipts | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Receipts" title="Receipts"
      description="Official receipts generated after server-side payment posting — with receipt numbers and PDF links."
      apiPath="/receipts"
      columns={[
        { key: "receiptNumber", header: "Receipt #" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "issuedAt", header: "Issued At" },
        { key: "pdfUrl", header: "PDF" },
      ]}
      rowHref={(row) => `/admin/receipts/${String(row._id)}`}
      primaryAction={{ href: "/admin/payments/new", label: "Record Payment" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
