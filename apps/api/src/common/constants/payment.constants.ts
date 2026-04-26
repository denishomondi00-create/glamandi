export const PAYMENT_METHOD_CODES = ['mpesa_manual', 'kcb_manual', 'cash', 'paystack', 'daraja_stk', 'daraja_c2b'] as const;
export type PaymentMethodCode = (typeof PAYMENT_METHOD_CODES)[number];

export const PAYMENT_STATUSES = ['draft', 'pending', 'posted', 'failed', 'reversed'] as const;
export const CHARGE_STATUSES = ['open', 'partially_paid', 'paid', 'void'] as const;

export const RENT_DUE_DAY = 5;
export const GLAMANDI_DEFAULT_COMMISSION_RATE = 0.1;
