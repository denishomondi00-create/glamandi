import { z } from "zod";

export const authSummarySchema = z.object({
  _id: z.string().optional(),
  email: z.string(),
  name: z.string(),
  role: z.string().optional(),
  status: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

export type AuthSummary = z.infer<typeof authSummarySchema>;

export const defaultAuthSummary: AuthSummary = {
  email: "",
  name: "Guest",
  role: undefined,
  status: undefined,
  permissions: [],
};
