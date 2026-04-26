import { z } from "zod";

export const inquirieSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type InquiriesSummary = z.infer<typeof inquirieSummarySchema>;

export const defaultInquiriesSummary: InquiriesSummary = {
  title: "Inquiries",
  description: "Website inquiries, CRM assignment, follow-up, conversion, and lost reasons.",
  route: "/inquiries",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /inquiries" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Inquiries record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
