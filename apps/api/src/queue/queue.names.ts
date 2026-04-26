export const QUEUE_NAMES = {
  "RENT_GENERATION": "rent-generation",
  "PENALTY_EVALUATION": "penalty-evaluation",
  "STATEMENT_GENERATION": "statement-generation",
  "RECEIPT_GENERATION": "receipt-generation",
  "NOTIFICATION_DISPATCH": "notification-dispatch",
  "WEBSITE_SYNC": "website-sync",
  "INQUIRY_FOLLOWUP": "inquiry-followup",
  "REPAIR_REMINDERS": "repair-reminders",
  "REPORT_EXPORT": "report-export",
  "PAYMENT_RECONCILIATION": "payment-reconciliation",
  "OFFLINE_SYNC_CLEANUP": "offline-sync-cleanup"
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
