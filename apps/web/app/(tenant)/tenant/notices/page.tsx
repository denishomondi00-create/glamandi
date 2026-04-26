import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Notices | Tenant Portal | Glamandi Homes",
  description: "Official tenant notices, policy updates, rent reminders, and operational announcements.",
};

export default async function Page() {
  const data = await getTenantPortalSection("notices");
  return <TenantSectionPage data={data} />;
}
