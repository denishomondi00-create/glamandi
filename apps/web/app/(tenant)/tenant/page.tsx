import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Tenant Command Center | Tenant Portal | Glamandi Homes",
  description: "Rent balance, receipts, penalties, utilities, repair requests, notices, and payment options from one tenant portal.",
};

export default async function Page() {
  const data = await getTenantPortalSection("dashboard");
  return <TenantSectionPage data={data} />;
}
