import type { Metadata } from "next";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Commission Rules | Settings | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Settings"
      title="Commission Rules"
      description="Configure Commission Rules. Changes take effect immediately and are logged to the audit trail."
      apiPath="/settings/commission-rules"
      method="PATCH"
      fields={[
        { key: "value", label: "Configuration Value", type: "textarea", placeholder: "JSON or text value for this setting group" },
        { key: "notes", label: "Change Notes", type: "textarea", placeholder: "Why this setting is being changed" },
      ]}
      secondaryAction={{ href: "/admin/settings", label: "All Settings" }}
    />
  );
}
