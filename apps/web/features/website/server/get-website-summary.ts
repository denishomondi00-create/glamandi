import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultWebsiteSummary, websiteSummarySchema, type WebsiteSummary } from "../schemas/website.schema";

export async function getWebsiteSummary(): Promise<WebsiteSummary> {
  try {
    const data = await serverApi.get<unknown>("/website/listings", { cache: "no-store" });
    const parsed = websiteSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultWebsiteSummary;
  } catch {
    return defaultWebsiteSummary;
  }
}
