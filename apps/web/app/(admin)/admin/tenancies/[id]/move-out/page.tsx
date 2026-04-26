import type { Metadata } from "next";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Move Out | Tenancy | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminFormPage eyebrow="Admin / Tenancies / Move Out" title="Move Out"
      description="Process a Move Out for this tenancy agreement."
      apiPath={`/tenancies/${id}/move-out`}
      method="POST"
      fields={[
        { key: "reason", label: "Reason", type: "textarea", required: true, placeholder: "Reason for Move Out" },
        { key: "effectiveDate", label: "Effective Date", type: "date" },
        { key: "notes", label: "Notes", type: "textarea", placeholder: "Additional notes" },
      ]}
      successRedirect="/admin/tenancies"
      secondaryAction={{ href: `/admin/tenancies/${id}`, label: "Cancel" }}
    />
  );
}
