import { z } from "zod";

export const dashboardSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type DashboardSummary = z.infer<typeof dashboardSummarySchema>;

export const defaultDashboardSummary: DashboardSummary = {
  title: "Dashboard",
  description: "Command center metrics for collections, occupancy, repairs, inquiries, and offline sync.",
  route: "/reports/dashboard",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /reports/dashboard" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Dashboard record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
