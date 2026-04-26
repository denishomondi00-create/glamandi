import { z } from "zod";

export const propertieSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type PropertiesSummary = z.infer<typeof propertieSummarySchema>;

export const defaultPropertiesSummary: PropertiesSummary = {
  title: "Properties",
  description: "Property records, location model, website publishing, and occupancy context.",
  route: "/properties",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /properties" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Properties record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
