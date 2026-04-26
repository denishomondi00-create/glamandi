import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Website Listings | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Website" title="Website Listings"
      description="Public property and unit listings — images, descriptions, pricing, and visibility status."
      apiPath="/website/listings"
      columns={[
        { key: "title", header: "Title" },
        { key: "type", header: "Type" },
        { key: "price", header: "Price (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Published" },
      ]}
      rowHref={() => `/admin/website/listings`}
      primaryAction={{ href: "/admin/website/listings", label: "Manage Listings" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
