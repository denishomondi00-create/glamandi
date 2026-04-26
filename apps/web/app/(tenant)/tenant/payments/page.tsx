import type { Metadata } from "next";
import { TenantSectionPage } from "@/features/tenants/components/tenant-section-page";
import { getTenantPortalSection } from "@/features/tenants/server/get-tenant-portal-section";

export const metadata: Metadata = {
  title: "Payments | Tenant Portal | Glamandi Homes",
  description: "Payment history across manual M-Pesa, KCB, cash, Paystack, and Daraja STK channels.",
};

export default async function Page() {
  const data = await getTenantPortalSection("payments");
  return <TenantSectionPage data={data} />;
}
