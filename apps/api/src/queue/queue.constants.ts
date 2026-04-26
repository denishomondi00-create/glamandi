export const DEFAULT_JOB_OPTIONS = { attempts: 3, backoff: { type: 'exponential', delay: 30000 }, removeOnComplete: true, removeOnFail: false } as const;
