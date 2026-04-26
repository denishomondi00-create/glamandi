import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Featured | Website | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Website / Featured" title="Website Featured"
      description="Manage Featured content on the Glamandi public website."
      apiPath="/website/listings"
      columns={[
        { key: "title", header: "Title" }, { key: "status", header: "Status" }, { key: "created_at", header: "Updated" },
      ]}
      primaryAction={{ href: "/admin/website", label: "Website Overview" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
