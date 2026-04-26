import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultUtilitiesSummary, utilitieSummarySchema, type UtilitiesSummary } from "../schemas/utilitie.schema";

export async function getUtilitiesSummary(): Promise<UtilitiesSummary> {
  try {
    const data = await serverApi.get<unknown>("/utilities", { cache: "no-store" });
    const parsed = utilitieSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultUtilitiesSummary;
  } catch {
    return defaultUtilitiesSummary;
  }
}
