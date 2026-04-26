import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultAuditSummary, auditSummarySchema, type AuditSummary } from "../schemas/audit.schema";

export async function getAuditSummary(): Promise<AuditSummary> {
  try {
    const data = await serverApi.get<unknown>("/audit", { cache: "no-store" });
    const parsed = auditSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultAuditSummary;
  } catch {
    return defaultAuditSummary;
  }
}
