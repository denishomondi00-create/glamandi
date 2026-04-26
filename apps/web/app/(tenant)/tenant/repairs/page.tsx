import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Repairs | Tenant Portal | Glamandi Homes",
  description: "Repair tickets, status updates, technician notes, and completion history.",
};

export default async function Page() {
  const data = await getTenantPortalSection("repairs");
  return <TenantSectionPage data={data} />;
}
