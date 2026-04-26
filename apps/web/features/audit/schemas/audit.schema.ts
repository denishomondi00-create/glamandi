import { z } from "zod";

export const auditSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type AuditSummary = z.infer<typeof auditSummarySchema>;

export const defaultAuditSummary: AuditSummary = {
  title: "Audit",
  description: "Audit trail for sensitive financial and operational actions.",
  route: "/audit",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /audit" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Audit record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
