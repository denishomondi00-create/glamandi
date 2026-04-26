import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Charge | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Charges"
      title="New Charge"
      description="Manually raise a charge against a tenant — rent, utility, move-in fee, or other billing."
      apiPath="/charges"
      successRedirect="/admin/charges"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "type", label: "Charge Type", type: "select", required: true, options: ["rent", "utility", "penalty", "move_in", "deposit", "other"] },
        { key: "period", label: "Period", placeholder: "e.g. 2025-04" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "dueDate", label: "Due Date", type: "date" },
        { key: "status", label: "Status", type: "select", options: ["open", "partial", "paid", "waived"] },
      ]}
      secondaryAction={{ href: "/admin/charges", label: "Cancel" }}
    />
  );
}
