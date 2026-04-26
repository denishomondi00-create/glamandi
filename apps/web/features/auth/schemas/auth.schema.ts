import { z } from "zod";

export const authSummarySchema = z.object({
  title: z.string(),
  description: z.string(),
  route: z.string(),
  metrics: z.array(z.object({ label: z.string(), value: z.string(), helper: z.string().optional() })),
  records: z.array(z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))),
});

export type AuthSummary = z.infer<typeof authSummarySchema>;

export const defaultAuthSummary: AuthSummary = {
  title: "Authentication",
  description: "Session, login, refresh, logout, and role-aware portal entry.",
  route: "/auth/me",
  metrics: [
    { label: "Active", value: "0", helper: "Connect to /auth/me" },
    { label: "Pending", value: "0", helper: "Requires review" },
    { label: "Updated", value: "Today", helper: "Server-backed" },
  ],
  records: [
    { id: "sample-1", name: "Sample Authentication record", status: "Draft", updated: "Today" },
    { id: "sample-2", name: "Connect API endpoint", status: "Pending", updated: "After backend" },
  ],
};
