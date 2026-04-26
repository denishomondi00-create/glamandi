import { z } from "zod";
export const OfflineSyncStatusSchema = z.object({ ok: z.boolean(), offlineSyncEnabled: z.boolean().optional(), serverTime: z.string().optional() });
export type OfflineSyncStatus = z.infer<typeof OfflineSyncStatusSchema>;
