import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Manual KCB | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage eyebrow="Admin / Payments" title="Manual KCB Payment"
      description="Record a KCB bank deposit or transfer against a tenant account."
      apiPath="/payments/manual-kcb" successRedirect="/admin/payments"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "reference", label: "Bank Reference", placeholder: "e.g. KCB-REF-0001" },
        { key: "paidAt", label: "Payment Date", type: "date" },
      ]}
      secondaryAction={{ href: "/admin/payments", label: "Cancel" }}
    />
  );
}
