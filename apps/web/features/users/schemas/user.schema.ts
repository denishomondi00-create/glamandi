import { z } from "zod";

export const userSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type UsersSummary = z.infer<typeof userSummarySchema>;

export const defaultUsersSummary: UsersSummary = {
  title: "Users",
  description: "Staff users, role assignment, portal access, and activation state.",
  route: "/users",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /users" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Users record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
