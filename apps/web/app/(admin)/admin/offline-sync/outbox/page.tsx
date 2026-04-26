import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Sync Outbox | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Offline Sync / Outbox" title="Sync Outbox"
      description="Pending sync batches waiting for server processing."
      apiPath="/sync/batches"
      columns={[
        { key: "deviceId", header: "Device ID" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Queued At" },
      ]}
      primaryAction={{ href: "/admin/offline-sync", label: "All Batches" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
