import type { Metadata } from "next";
import { TenantRepairRequestPage } from "@/features/repairs/components/tenant-repair-request-page";
import { getTenantRepairRequestContext } from "@/features/repairs/server/get-tenant-repair-request-context";

export const metadata: Metadata = {
  title: "New Repair Request | Tenant Portal | Glamandi Homes",
  description: "Submit a tenant repair request with offline draft support and server-side sync when connection returns.",
};

export default async function NewRepairRequestPage() {
  const context = await getTenantRepairRequestContext();
  return <TenantRepairRequestPage context={context} />;
}
