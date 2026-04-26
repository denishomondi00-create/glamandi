import { z } from "zod";

export const paymentSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type PaymentsSummary = z.infer<typeof paymentSummarySchema>;

export const defaultPaymentsSummary: PaymentsSummary = {
  title: "Payments",
  description: "Manual M-Pesa, KCB, cash, Paystack, Daraja STK, reconciliation, and allocation.",
  route: "/payments",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /payments" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Payments record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
