import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultReportsSummary, reportSummarySchema, type ReportsSummary } from "../schemas/report.schema";

export async function getReportsSummary(): Promise<ReportsSummary> {
  try {
    const data = await serverApi.get<unknown>("/reports/dashboard", { cache: "no-store" });
    const parsed = reportSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultReportsSummary;
  } catch {
    return defaultReportsSummary;
  }
}
