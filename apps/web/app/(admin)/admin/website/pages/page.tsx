import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Pages | Website | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Website / Pages" title="Website Pages"
      description="Manage Pages content on the Glamandi public website."
      apiPath="/website/listings"
      columns={[
        { key: "title", header: "Title" }, { key: "status", header: "Status" }, { key: "created_at", header: "Updated" },
      ]}
      primaryAction={{ href: "/admin/website", label: "Website Overview" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
