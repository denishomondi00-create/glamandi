import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "My Profile | Tenant Portal | Glamandi Homes",
  description: "Tenant contact details, notification preferences, and basic account information.",
};

export default async function Page() {
  const data = await getTenantPortalSection("profile");
  return <TenantSectionPage data={data} />;
}
