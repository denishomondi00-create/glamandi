import { z } from "zod";

export const websiteSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type WebsiteSummary = z.infer<typeof websiteSummarySchema>;

export const defaultWebsiteSummary: WebsiteSummary = {
  title: "Website",
  description: "Public listing CMS, featured units, SEO pages, and listing sync.",
  route: "/website/listings",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /website/listings" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Website record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
