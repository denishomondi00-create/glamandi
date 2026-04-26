export const WEBHOOK_PROVIDERS = {
  paystack: 'paystack',
  daraja: 'daraja',
  internal: 'internal',
} as const;

export const WEBHOOK_EVENT_TYPES = {
  paystackChargeSuccess: 'paystack.charge.success',
  darajaStkCallback: 'daraja.stk.callback',
  darajaResult: 'daraja.result',
  darajaTimeout: 'daraja.timeout',
  darajaC2bValidation: 'daraja.c2b.validation',
  darajaC2bConfirmation: 'daraja.c2b.confirmation',
  workerHealth: 'internal.worker_health',
} as const;
export type WebhookEventType = (typeof WEBHOOK_EVENT_TYPES)[keyof typeof WEBHOOK_EVENT_TYPES];
