import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Deposit | Tenant Portal | Glamandi Homes",
  description: "Deposit status, refund eligibility, notice requirements, deductions, and exit review progress.",
};

export default async function Page() {
  const data = await getTenantPortalSection("deposit");
  return <TenantSectionPage data={data} />;
}
