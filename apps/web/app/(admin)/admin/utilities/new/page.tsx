import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Utility Charge | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Utilities"
      title="New Utility Charge"
      description="Log a utility charge for water, electricity, or other services for a tenant or unit."
      apiPath="/utilities"
      successRedirect="/admin/utilities"
      fields={[
        { key: "tenantId", label: "Tenant ID", placeholder: "MongoDB ObjectId" },
        { key: "unitId", label: "Unit ID", placeholder: "MongoDB ObjectId" },
        { key: "type", label: "Utility Type", type: "select", required: true, options: ["water", "electricity", "gas", "internet", "garbage", "other"] },
        { key: "period", label: "Period", placeholder: "e.g. 2025-04" },
        { key: "units", label: "Units Consumed", type: "number", placeholder: "0" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "1500" },
        { key: "status", label: "Status", type: "select", options: ["open", "paid", "waived"] },
      ]}
      secondaryAction={{ href: "/admin/utilities", label: "Cancel" }}
    />
  );
}
