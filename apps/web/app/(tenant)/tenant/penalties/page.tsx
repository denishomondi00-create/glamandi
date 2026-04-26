import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Penalties | Tenant Portal | Glamandi Homes",
  description: "Late rent penalty status, waiver decisions, exception notes, and communication records.",
};

export default async function Page() {
  const data = await getTenantPortalSection("penalties");
  return <TenantSectionPage data={data} />;
}
