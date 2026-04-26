import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultDashboardSummary, dashboardSummarySchema, type DashboardSummary } from "../schemas/dashboard.schema";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const data = await serverApi.get<unknown>("/reports/dashboard", { cache: "no-store" });
    const parsed = dashboardSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultDashboardSummary;
  } catch {
    return defaultDashboardSummary;
  }
}
