import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultRepairsSummary, repairSummarySchema, type RepairsSummary } from "../schemas/repair.schema";

export async function getRepairsSummary(): Promise<RepairsSummary> {
  try {
    const data = await serverApi.get<unknown>("/repairs", { cache: "no-store" });
    const parsed = repairSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultRepairsSummary;
  } catch {
    return defaultRepairsSummary;
  }
}
