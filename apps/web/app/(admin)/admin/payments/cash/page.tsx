import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Cash Payment | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage eyebrow="Admin / Payments" title="Cash Payment"
      description="Record a cash payment received in the office. A receipt will be generated after posting."
      apiPath="/payments/cash" successRedirect="/admin/payments"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "reference", label: "Reference Number", placeholder: "e.g. CASH-2025-001" },
        { key: "paidAt", label: "Payment Date", type: "date" },
        { key: "notes", label: "Notes", type: "textarea", placeholder: "Received by, voucher ref, etc." },
      ]}
      secondaryAction={{ href: "/admin/payments", label: "Cancel" }}
    />
  );
}
