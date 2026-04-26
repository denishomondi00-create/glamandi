import { z } from "zod";

export const statementSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type StatementsSummary = z.infer<typeof statementSummarySchema>;

export const defaultStatementsSummary: StatementsSummary = {
  title: "Statements",
  description: "Tenant and landlord statements, PDFs, emails, and generation rules.",
  route: "/statements/landlords",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /statements/landlords" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Statements record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
