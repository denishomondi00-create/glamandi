import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultAuthSummary, authSummarySchema, type AuthSummary } from "../schemas/auth.schema";

export async function getAuthSummary(): Promise<AuthSummary> {
  try {
    const data = await serverApi.get<unknown>("/auth/me", { cache: "no-store" });
    const parsed = authSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultAuthSummary;
  } catch {
    return defaultAuthSummary;
  }
}
