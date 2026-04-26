import { z } from "zod";

export const landlordSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type LandlordsSummary = z.infer<typeof landlordSummarySchema>;

export const defaultLandlordsSummary: LandlordsSummary = {
  title: "Landlords",
  description: "Landlord records, owned properties, statements, payouts, deductions, and documents.",
  route: "/landlords",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /landlords" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Landlords record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
