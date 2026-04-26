import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Property | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Properties"
      title="New Property"
      description="Register a new property under Glamandi management. Units are added separately after the property is created."
      apiPath="/properties"
      successRedirect="/admin/properties"
      fields={[
        { key: "name", label: "Property Name", required: true, placeholder: "e.g. Glamandi Heights" },
        { key: "slug", label: "URL Slug", required: true, placeholder: "e.g. glamandi-heights" },
        { key: "managementType", label: "Management Type", type: "select", options: ["managed", "leasehold", "partnership"], required: true },
        { key: "status", label: "Status", type: "select", options: ["active", "inactive"], required: true },
        { key: "listingStatus", label: "Listing Status", type: "select", options: ["draft", "published", "unlisted"] },
      ]}
      secondaryAction={{ href: "/admin/properties", label: "Cancel" }}
    />
  );
}
