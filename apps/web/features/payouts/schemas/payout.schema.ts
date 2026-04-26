import { z } from "zod";

export const payoutSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type PayoutsSummary = z.infer<typeof payoutSummarySchema>;

export const defaultPayoutsSummary: PayoutsSummary = {
  title: "Payouts",
  description: "Landlord payout workflow, mark-paid controls, reversals, and proof uploads.",
  route: "/payouts",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /payouts" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Payouts record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
