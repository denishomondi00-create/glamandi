import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Tenant | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Tenants"
      title="New Tenant"
      description="Create a tenant profile. A tenancy must be created separately to assign the tenant to a unit."
      apiPath="/tenants"
      successRedirect="/admin/tenants"
      fields={[
        { key: "firstName", label: "First Name", required: true, placeholder: "e.g. Jane" },
        { key: "lastName", label: "Last Name", placeholder: "e.g. Mwangi" },
        { key: "phone", label: "Phone", type: "tel", required: true, placeholder: "+254..." },
        { key: "email", label: "Email", type: "email", placeholder: "jane@example.com" },
        { key: "idNumber", label: "National ID / Passport", placeholder: "12345678" },
        { key: "status", label: "Status", type: "select", options: ["active", "inactive", "blacklisted"], required: true },
      ]}
      secondaryAction={{ href: "/admin/tenants", label: "Cancel" }}
    />
  );
}
