import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Landlord | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Landlords"
      title="New Landlord"
      description="Register a landlord account for statement generation, payout processing, and property management."
      apiPath="/landlords"
      successRedirect="/admin/landlords"
      fields={[
        { key: "firstName", label: "First Name", required: true, placeholder: "e.g. James" },
        { key: "lastName", label: "Last Name", placeholder: "e.g. Kariuki" },
        { key: "phone", label: "Phone", type: "tel", required: true, placeholder: "+254..." },
        { key: "email", label: "Email", type: "email", placeholder: "james@example.com" },
        { key: "idNumber", label: "National ID / Passport", placeholder: "12345678" },
        { key: "status", label: "Status", type: "select", options: ["active", "inactive"] },
        { key: "notes", label: "Notes", type: "textarea", placeholder: "Bank details, agreements, etc." },
      ]}
      secondaryAction={{ href: "/admin/landlords", label: "Cancel" }}
    />
  );
}
