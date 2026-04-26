import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Utilities | Tenant Portal | Glamandi Homes",
  description: "Utility charges, meter notes, billing periods, and payment status.",
};

export default async function Page() {
  const data = await getTenantPortalSection("utilities");
  return <TenantSectionPage data={data} />;
}
