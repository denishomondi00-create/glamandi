import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Receipts | Tenant Portal | Glamandi Homes",
  description: "Official receipts generated only after the server accepts and posts payment records.",
};

export default async function Page() {
  const data = await getTenantPortalSection("receipts");
  return <TenantSectionPage data={data} />;
}
