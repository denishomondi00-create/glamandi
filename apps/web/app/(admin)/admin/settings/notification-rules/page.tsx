import type { Metadata } from "next";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { AdminFormPage } from "@/components/glamandi/admin-form-page";
export const metadata: Metadata = { title: "Notification Rules | Settings | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminFormPage
      eyebrow="Admin / Settings"
      title="Notification Rules"
      description="Configure Notification Rules. Changes take effect immediately and are logged to the audit trail."
      apiPath="/settings/notification-rules"
      method="PATCH"
      fields={[
        { key: "value", label: "Configuration Value", type: "textarea", placeholder: "JSON or text value for this setting group" },
        { key: "notes", label: "Change Notes", type: "textarea", placeholder: "Why this setting is being changed" },
      ]}
      secondaryAction={{ href: "/admin/settings", label: "All Settings" }}
    />
  );
}
