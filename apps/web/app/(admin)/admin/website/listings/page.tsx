import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Listings | Website | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Website / Listings" title="Website Listings"
      description="Public property and unit listings — images, descriptions, pricing, availability, and SEO metadata."
      apiPath="/website/listings"
      columns={[
        { key: "title", header: "Title" }, { key: "type", header: "Type" },
        { key: "price", header: "Price (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "status", header: "Status" }, { key: "created_at", header: "Published" },
      ]}
      primaryAction={{ href: "/admin/website", label: "Website Overview" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
