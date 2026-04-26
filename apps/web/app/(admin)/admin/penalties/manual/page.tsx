import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Manual Penalty | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage eyebrow="Admin / Penalties" title="Manual Penalty"
      description="Apply a manual penalty to a tenant account outside the automated penalty evaluation cycle."
      apiPath="/penalties" successRedirect="/admin/penalties"
      fields={[
        { key: "tenantId", label: "Tenant ID", required: true, placeholder: "MongoDB ObjectId" },
        { key: "tenancyId", label: "Tenancy ID", placeholder: "MongoDB ObjectId" },
        { key: "amount", label: "Amount (KES)", type: "number", required: true, placeholder: "500" },
        { key: "band", label: "Penalty Band", placeholder: "e.g. Week 1" },
        { key: "reason", label: "Reason", type: "textarea", required: true, placeholder: "Reason for manual penalty" },
        { key: "status", label: "Status", type: "select", options: ["pending", "active", "waived"] },
      ]}
      secondaryAction={{ href: "/admin/penalties", label: "Cancel" }}
    />
  );
}
