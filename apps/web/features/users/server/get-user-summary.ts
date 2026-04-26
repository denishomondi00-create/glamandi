import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultUsersSummary, userSummarySchema, type UsersSummary } from "../schemas/user.schema";

export async function getUsersSummary(): Promise<UsersSummary> {
  try {
    const data = await serverApi.get<unknown>("/users", { cache: "no-store" });
    const parsed = userSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultUsersSummary;
  } catch {
    return defaultUsersSummary;
  }
}
