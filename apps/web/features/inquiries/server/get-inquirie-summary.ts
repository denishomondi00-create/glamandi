import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultInquiriesSummary, inquirieSummarySchema, type InquiriesSummary } from "../schemas/inquirie.schema";

export async function getInquiriesSummary(): Promise<InquiriesSummary> {
  try {
    const data = await serverApi.get<unknown>("/inquiries", { cache: "no-store" });
    const parsed = inquirieSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultInquiriesSummary;
  } catch {
    return defaultInquiriesSummary;
  }
}
