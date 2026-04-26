import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Charges | Tenant Portal | Glamandi Homes",
  description: "Rent, utilities, penalties, move-in charges, and other tenant billings.",
};

export default async function Page() {
  const data = await getTenantPortalSection("charges");
  return <TenantSectionPage data={data} />;
}
