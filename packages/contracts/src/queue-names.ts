export const QUEUE_NAMES = {
  rentGeneration: 'rent-generation',
  penaltyEvaluation: 'penalty-evaluation',
  statementGeneration: 'statement-generation',
  receiptGeneration: 'receipt-generation',
  notificationDispatch: 'notification-dispatch',
  websiteSync: 'website-sync',
  inquiryFollowup: 'inquiry-followup',
  repairReminders: 'repair-reminders',
  reportExport: 'report-export',
  paymentReconciliation: 'payment-reconciliation',
  offlineSyncCleanup: 'offline-sync-cleanup',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];

export const QUEUE_DISPLAY_NAMES: Record<QueueName, string> = {
  [QUEUE_NAMES.rentGeneration]: 'Monthly rent generation',
  [QUEUE_NAMES.penaltyEvaluation]: 'Penalty evaluation',
  [QUEUE_NAMES.statementGeneration]: 'Statement generation',
  [QUEUE_NAMES.receiptGeneration]: 'Receipt PDF generation',
  [QUEUE_NAMES.notificationDispatch]: 'Notification dispatch',
  [QUEUE_NAMES.websiteSync]: 'Website listing sync',
  [QUEUE_NAMES.inquiryFollowup]: 'Inquiry follow-up',
  [QUEUE_NAMES.repairReminders]: 'Repair reminders',
  [QUEUE_NAMES.reportExport]: 'Report export',
  [QUEUE_NAMES.paymentReconciliation]: 'Payment reconciliation',
  [QUEUE_NAMES.offlineSyncCleanup]: 'Offline sync cleanup',
};
