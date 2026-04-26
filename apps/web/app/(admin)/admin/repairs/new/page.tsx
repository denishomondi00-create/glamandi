import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "New Repair Ticket | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Repairs"
      title="New Repair Ticket"
      description="Log a maintenance or repair request. Link to a tenant or unit for tracking and deduction processing."
      apiPath="/repairs"
      successRedirect="/admin/repairs"
      fields={[
        { key: "title", label: "Title", required: true, placeholder: "e.g. Broken door lock – Unit A3" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Detailed description of the issue" },
        { key: "unitId", label: "Unit ID", placeholder: "MongoDB ObjectId (optional)" },
        { key: "tenantId", label: "Tenant ID", placeholder: "MongoDB ObjectId (optional)" },
        { key: "priority", label: "Priority", type: "select", options: ["low", "normal", "high", "urgent"] },
        { key: "status", label: "Status", type: "select", options: ["open", "in_progress", "done", "cancelled"] },
        { key: "dueDate", label: "Due Date", type: "date" },
      ]}
      secondaryAction={{ href: "/admin/repairs", label: "Cancel" }}
    />
  );
}
