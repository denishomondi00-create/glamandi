import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultStatementsSummary, statementSummarySchema, type StatementsSummary } from "../schemas/statement.schema";

export async function getStatementsSummary(): Promise<StatementsSummary> {
  try {
    const data = await serverApi.get<unknown>("/statements/landlords", { cache: "no-store" });
    const parsed = statementSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultStatementsSummary;
  } catch {
    return defaultStatementsSummary;
  }
}
