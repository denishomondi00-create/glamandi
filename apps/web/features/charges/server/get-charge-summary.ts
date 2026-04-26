import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultChargesSummary, chargeSummarySchema, type ChargesSummary } from "../schemas/charge.schema";

export async function getChargesSummary(): Promise<ChargesSummary> {
  try {
    const data = await serverApi.get<unknown>("/charges", { cache: "no-store" });
    const parsed = chargeSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultChargesSummary;
  } catch {
    return defaultChargesSummary;
  }
}
