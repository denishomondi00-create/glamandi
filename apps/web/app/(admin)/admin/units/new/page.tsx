import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Unit | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Units"
      title="New Unit"
      description="Add a unit to an existing property. The property ID is required to link the unit correctly."
      apiPath="/units"
      successRedirect="/admin/units"
      fields={[
        { key: "propertyId", label: "Property ID", required: true, placeholder: "MongoDB ObjectId of the property" },
        { key: "unitLabel", label: "Unit Label", required: true, placeholder: "e.g. A1, Ground Floor Bedsitter" },
        { key: "unitNumber", label: "Unit Number", placeholder: "e.g. 01" },
        { key: "type", label: "Type", type: "select", options: ["bedsitter", "studio", "1br", "2br", "3br", "shop", "office", "other"] },
        { key: "bedrooms", label: "Bedrooms", type: "number", placeholder: "0" },
        { key: "bathrooms", label: "Bathrooms", type: "number", placeholder: "1" },
        { key: "rentAmount", label: "Rent Amount (KES)", type: "number", required: true, placeholder: "18000" },
        { key: "depositAmount", label: "Deposit Amount (KES)", type: "number", placeholder: "18000" },
        { key: "status", label: "Status", type: "select", options: ["vacant", "occupied", "maintenance", "locked"] },
      ]}
      secondaryAction={{ href: "/admin/units", label: "Cancel" }}
    />
  );
}
