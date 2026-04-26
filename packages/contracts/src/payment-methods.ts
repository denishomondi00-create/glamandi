export const PAYMENT_METHOD_CODES = {
  mpesaManual: 'mpesa_manual',
  kcbManual: 'kcb_manual',
  cash: 'cash',
  paystack: 'paystack',
  darajaStk: 'daraja_stk',
  darajaC2b: 'daraja_c2b',
} as const;

export type PaymentMethodCode = (typeof PAYMENT_METHOD_CODES)[keyof typeof PAYMENT_METHOD_CODES];

export const OFFLINE_PAYMENT_METHODS: PaymentMethodCode[] = [
  PAYMENT_METHOD_CODES.mpesaManual,
  PAYMENT_METHOD_CODES.kcbManual,
  PAYMENT_METHOD_CODES.cash,
];

export const ONLINE_ONLY_PAYMENT_METHODS: PaymentMethodCode[] = [
  PAYMENT_METHOD_CODES.paystack,
  PAYMENT_METHOD_CODES.darajaStk,
  PAYMENT_METHOD_CODES.darajaC2b,
];
