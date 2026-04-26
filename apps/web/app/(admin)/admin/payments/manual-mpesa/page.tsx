import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Manual M-Pesa | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage eyebrow="Admin / Payments" title="Manual M-Pesa Payment"
      description="Record a manual M-Pesa transfer by entering the transaction code, amount, and tenant details."
      apiPath="/payments/manual-mpesa" successRedirect="/admin/payments"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "reference", label: "M-Pesa Transaction Code", required: true, placeholder: "e.g. RGH8X0AABC" },
        { key: "paidAt", label: "Payment Date", type: "date" },
        { key: "notes", label: "Notes", type: "textarea", placeholder: "Optional notes" },
      ]}
      secondaryAction={{ href: "/admin/payments", label: "Cancel" }}
    />
  );
}
