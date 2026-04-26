import { z } from "zod";

export const reportSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type ReportsSummary = z.infer<typeof reportSummarySchema>;

export const defaultReportsSummary: ReportsSummary = {
  title: "Reports",
  description: "Collections, occupancy, defaulters, commission, repairs, deposits, inquiries, and exports.",
  route: "/reports/dashboard",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /reports/dashboard" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Reports record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
