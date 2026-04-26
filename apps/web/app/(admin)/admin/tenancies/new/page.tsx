import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Tenancy | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Tenancies"
      title="New Tenancy"
      description="Create a tenancy agreement linking a tenant to a unit. This triggers rent charge generation."
      apiPath="/tenancies"
      successRedirect="/admin/tenancies"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "propertyId", label: "Property ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "unitId", label: "Unit ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "rentAmount", label: "Rent Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "depositAmount", label: "Deposit Amount (KES)", type: "number", placeholder: "18000" },
        { key: "startDate", label: "Start Date", type: "date", required: true },
        { key: "billingDay", label: "Billing Day (1–31)", type: "number", placeholder: "5" },
        { key: "status", label: "Status", type: "select", options: ["active", "notice", "inactive"] },
      ]}
      secondaryAction={{ href: "/admin/tenancies", label: "Cancel" }}
    />
  );
}
