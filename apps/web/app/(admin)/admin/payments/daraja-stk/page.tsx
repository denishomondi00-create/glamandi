import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Daraja STK Push | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage eyebrow="Admin / Payments" title="Daraja STK Push"
      description="Send an M-Pesa STK push request to the tenant's phone via Safaricom Daraja API."
      apiPath="/payments/initialize-daraja-stk" successRedirect="/admin/payments"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "phone", label: "Phone (07XXXXXXXX)", type: "tel", required: true, placeholder: "0712345678" },
      ]}
      secondaryAction={{ href: "/admin/payments", label: "Cancel" }}
    />
  );
}
