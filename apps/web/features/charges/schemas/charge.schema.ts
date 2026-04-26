import { z } from "zod";

export const chargeSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type ChargesSummary = z.infer<typeof chargeSummarySchema>;

export const defaultChargesSummary: ChargesSummary = {
  title: "Charges",
  description: "Rent, utilities, move-in billing, voids, and monthly charge generation.",
  route: "/charges",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /charges" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Charges record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
