import { QUEUE_NAMES } from './queue-names';

export const REPEATABLE_JOBS = [
  { queueName: QUEUE_NAMES.rentGeneration, jobName: 'monthly-rent-generation', cron: '0 1 1 * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.penaltyEvaluation, jobName: 'daily-penalty-evaluation', cron: '0 2 * * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.statementGeneration, jobName: 'monthly-landlord-statements', cron: '0 3 6 * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.websiteSync, jobName: 'daily-website-sync', cron: '0 4 * * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.inquiryFollowup, jobName: 'stale-inquiry-followup', cron: '*/30 * * * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.repairReminders, jobName: 'repair-reminders', cron: '0 */4 * * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.paymentReconciliation, jobName: 'payment-reconciliation', cron: '*/15 * * * *', payload: { requestedBy: 'system' } },
  { queueName: QUEUE_NAMES.offlineSyncCleanup, jobName: 'offline-sync-cleanup', cron: '0 5 * * *', payload: { requestedBy: 'system' } },
] as const;
