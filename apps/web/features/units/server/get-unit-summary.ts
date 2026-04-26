import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultUnitsSummary, unitSummarySchema, type UnitsSummary } from "../schemas/unit.schema";

export async function getUnitsSummary(): Promise<UnitsSummary> {
  try {
    const data = await serverApi.get<unknown>("/units", { cache: "no-store" });
    const parsed = unitSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultUnitsSummary;
  } catch {
    return defaultUnitsSummary;
  }
}
