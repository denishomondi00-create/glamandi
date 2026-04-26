import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Reconciliation | Payments | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Payments / Reconciliation" title="Payment Reconciliation"
      description="Reconcile unallocated payments with open charges — match references and allocate to tenancy accounts."
      apiPath="/payments"
      columns={[
        { key: "reference", header: "Reference" }, { key: "method", header: "Method" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "allocationStatus", header: "Allocation" }, { key: "status", header: "Status" },
      ]}
      primaryAction={{ href: "/admin/payments", label: "All Payments" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
