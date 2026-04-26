import { z } from "zod";

export const unitSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type UnitsSummary = z.infer<typeof unitSummarySchema>;

export const defaultUnitsSummary: UnitsSummary = {
  title: "Units",
  description: "Unit records, unit-level access details, status, publishing, and tenancy links.",
  route: "/units",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /units" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Units record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
