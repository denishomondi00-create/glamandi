import { z } from "zod";

export const tenantSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type TenantsSummary = z.infer<typeof tenantSummarySchema>;

export const defaultTenantsSummary: TenantsSummary = {
  title: "Tenants",
  description: "Tenant records, rent balance, receipts, penalties, deposits, utilities, and repairs.",
  route: "/tenants",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /tenants" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Tenants record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
