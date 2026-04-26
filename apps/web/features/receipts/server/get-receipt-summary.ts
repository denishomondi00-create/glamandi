import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultReceiptsSummary, receiptSummarySchema, type ReceiptsSummary } from "../schemas/receipt.schema";

export async function getReceiptsSummary(): Promise<ReceiptsSummary> {
  try {
    const data = await serverApi.get<unknown>("/receipts", { cache: "no-store" });
    const parsed = receiptSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultReceiptsSummary;
  } catch {
    return defaultReceiptsSummary;
  }
}
