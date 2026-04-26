import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Payments | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Payments" title="Payments"
      description="All posted payments across channels — M-Pesa, KCB, cash, Paystack, Daraja STK — with allocation and audit trail."
      apiPath="/payments"
      columns={[
        { key: "reference", header: "Reference" },
        { key: "method", header: "Method" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "currency", header: "Currency" },
        { key: "status", header: "Status" },
        { key: "allocationStatus", header: "Allocation" },
        { key: "paidAt", header: "Paid At" },
      ]}
      rowHref={() => `/admin/payments`}
      primaryAction={{ href: "/admin/payments/new", label: "Record Payment" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
