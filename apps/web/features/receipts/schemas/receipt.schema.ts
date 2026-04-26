import { z } from "zod";

export const receiptSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type ReceiptsSummary = z.infer<typeof receiptSummarySchema>;

export const defaultReceiptsSummary: ReceiptsSummary = {
  title: "Receipts",
  description: "Official receipt records, PDF generation, regeneration, and tenant downloads.",
  route: "/receipts",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /receipts" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Receipts record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
