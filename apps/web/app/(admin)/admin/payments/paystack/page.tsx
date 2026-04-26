import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Paystack Payment | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage eyebrow="Admin / Payments" title="Paystack Payment"
      description="Initialize a Paystack payment intent. The tenant will complete payment online and a receipt is generated after verification."
      apiPath="/payments/initialize-paystack" successRedirect="/admin/payments"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "email", label: "Tenant Email", type: "email", required: true, placeholder: "tenant@example.com" },
      ]}
      secondaryAction={{ href: "/admin/payments", label: "Cancel" }}
    />
  );
}
