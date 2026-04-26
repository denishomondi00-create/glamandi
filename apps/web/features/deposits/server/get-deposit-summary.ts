import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultDepositsSummary, depositSummarySchema, type DepositsSummary } from "../schemas/deposit.schema";

export async function getDepositsSummary(): Promise<DepositsSummary> {
  try {
    const data = await serverApi.get<unknown>("/deposits", { cache: "no-store" });
    const parsed = depositSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultDepositsSummary;
  } catch {
    return defaultDepositsSummary;
  }
}
