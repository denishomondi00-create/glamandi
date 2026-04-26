import { z } from "zod";

export const tenancieSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type TenanciesSummary = z.infer<typeof tenancieSummarySchema>;

export const defaultTenanciesSummary: TenanciesSummary = {
  title: "Tenancies",
  description: "Move-in, move-out, transfer, notice, and historical location snapshots.",
  route: "/tenancies",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /tenancies" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Tenancies record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
