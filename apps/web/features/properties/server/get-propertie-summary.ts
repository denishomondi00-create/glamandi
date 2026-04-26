import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultPropertiesSummary, propertieSummarySchema, type PropertiesSummary } from "../schemas/propertie.schema";

export async function getPropertiesSummary(): Promise<PropertiesSummary> {
  try {
    const data = await serverApi.get<unknown>("/properties", { cache: "no-store" });
    const parsed = propertieSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultPropertiesSummary;
  } catch {
    return defaultPropertiesSummary;
  }
}
