import { z } from "zod";

export const repairSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type RepairsSummary = z.infer<typeof repairSummarySchema>;

export const defaultRepairsSummary: RepairsSummary = {
  title: "Repairs",
  description: "Repair tickets, assignment, completion, expense proofs, and landlord deduction approval.",
  route: "/repairs",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /repairs" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Repairs record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
