import { serverApi } from "@/lib/api-client/server-fetcher";
import { defaultPaymentsSummary, paymentSummarySchema, type PaymentsSummary } from "../schemas/payment.schema";

export async function getPaymentsSummary(): Promise<PaymentsSummary> {
  try {
    const data = await serverApi.get<unknown>("/payments", { cache: "no-store" });
    const parsed = paymentSummarySchema.safeParse(data);
    return parsed.success ? parsed.data : defaultPaymentsSummary;
  } catch {
    return defaultPaymentsSummary;
  }
}
