import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultTenanciesSummary, tenancieSummarySchema, type TenanciesSummary } from "../schemas/tenancie.schema";

export async function getTenanciesSummary(): Promise<TenanciesSummary> {
  try {
    const data = await serverApi.get<unknown>("/tenancies", { cache: "no-store" });
    const parsed = tenancieSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultTenanciesSummary;
  } catch {
    return defaultTenanciesSummary;
  }
}
