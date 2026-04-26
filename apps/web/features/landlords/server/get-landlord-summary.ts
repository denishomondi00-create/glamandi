import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultLandlordsSummary, landlordSummarySchema, type LandlordsSummary } from "../schemas/landlord.schema";

export async function getLandlordsSummary(): Promise<LandlordsSummary> {
  try {
    const data = await serverApi.get<unknown>("/landlords", { cache: "no-store" });
    const parsed = landlordSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultLandlordsSummary;
  } catch {
    return defaultLandlordsSummary;
  }
}
