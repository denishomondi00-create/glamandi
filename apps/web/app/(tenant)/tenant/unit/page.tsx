import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "My Unit | Tenant Portal | Glamandi Homes",
  description: "Current unit details, property location snapshot, access notes, and tenancy status.",
};

export default async function Page() {
  const data = await getTenantPortalSection("unit");
  return <TenantSectionPage data={data} />;
}
