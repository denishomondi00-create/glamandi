import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultSettingsSummary, settingSummarySchema, type SettingsSummary } from "../schemas/setting.schema";

export async function getSettingsSummary(): Promise<SettingsSummary> {
  try {
    const data = await serverApi.get<unknown>("/settings", { cache: "no-store" });
    const parsed = settingSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultSettingsSummary;
  } catch {
    return defaultSettingsSummary;
  }
}
