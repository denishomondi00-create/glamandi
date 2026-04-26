import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultPayoutsSummary, payoutSummarySchema, type PayoutsSummary } from "../schemas/payout.schema";

export async function getPayoutsSummary(): Promise<PayoutsSummary> {
  try {
    const data = await serverApi.get<unknown>("/payouts", { cache: "no-store" });
    const parsed = payoutSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultPayoutsSummary;
  } catch {
    return defaultPayoutsSummary;
  }
}
