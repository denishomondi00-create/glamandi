import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Offline Sync | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Offline Sync" title="Sync Batches"
      description="Offline sync batches pushed by field devices — review status, conflicts, and apply server corrections."
      apiPath="/sync/batches"
      columns={[
        { key: "deviceId", header: "Device ID" },
        { key: "status", header: "Status" },
        { key: "accepted", header: "Accepted" },
        { key: "conflicts", header: "Conflicts" },
        { key: "created_at", header: "Pushed At" },
      ]}
      primaryAction={{ href: "/admin/offline-sync/conflicts", label: "View Conflicts" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
