import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultPenaltiesSummary, penaltieSummarySchema, type PenaltiesSummary } from "../schemas/penaltie.schema";

export async function getPenaltiesSummary(): Promise<PenaltiesSummary> {
  try {
    const data = await serverApi.get<unknown>("/penalties", { cache: "no-store" });
    const parsed = penaltieSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultPenaltiesSummary;
  } catch {
    return defaultPenaltiesSummary;
  }
}
