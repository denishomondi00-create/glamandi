import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultTenantsSummary, tenantSummarySchema, type TenantsSummary } from "../schemas/tenant.schema";

export async function getTenantsSummary(): Promise<TenantsSummary> {
  try {
    const data = await serverApi.get<unknown>("/tenants", { cache: "no-store" });
    const parsed = tenantSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultTenantsSummary;
  } catch {
    return defaultTenantsSummary;
  }
}
