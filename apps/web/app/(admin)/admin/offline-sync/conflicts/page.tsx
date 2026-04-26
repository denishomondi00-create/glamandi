import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Sync Conflicts | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Offline Sync / Conflicts" title="Sync Conflicts"
      description="Open sync conflicts requiring admin resolution — server and client versions shown side-by-side."
      apiPath="/sync/conflicts"
      columns={[
        { key: "collection", header: "Collection" },
        { key: "recordId", header: "Record ID" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Detected" },
      ]}
      primaryAction={{ href: "/admin/offline-sync", label: "All Batches" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
