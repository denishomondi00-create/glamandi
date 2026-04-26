import { z } from "zod";

export const utilitieSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type UtilitiesSummary = z.infer<typeof utilitieSummarySchema>;

export const defaultUtilitiesSummary: UtilitiesSummary = {
  title: "Utilities",
  description: "Utility charge drafts, posted utilities, billing periods, and tenant visibility.",
  route: "/utilities",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /utilities" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Utilities record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
