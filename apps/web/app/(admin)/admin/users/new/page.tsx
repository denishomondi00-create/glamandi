import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New User | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Users"
      title="New Staff User"
      description="Create a system user with a role and initial password. The password will be hashed on save."
      apiPath="/users"
      successRedirect="/admin/users"
      fields={[
        { key: "name", label: "Full Name", required: true, placeholder: "e.g. Sarah Odhiambo" },
        { key: "email", label: "Email", type: "email", required: true, placeholder: "sarah@glamandi.co.ke" },
        { key: "phone", label: "Phone", type: "tel", placeholder: "+254..." },
        { key: "role", label: "Role", type: "select", options: ["admin", "staff", "readonly"], required: true },
        { key: "password", label: "Initial Password", type: "password", required: true, placeholder: "Min 8 characters" },
        { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
      ]}
      secondaryAction={{ href: "/admin/users", label: "Cancel" }}
    />
  );
}
