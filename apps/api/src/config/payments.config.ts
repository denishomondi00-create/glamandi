import { registerAs } from '@nestjs/config';

export default registerAs('payments', () => ({
  currency: process.env.PAYMENT_CURRENCY ?? 'KES',
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
    webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET,
    callbackUrl: process.env.PAYSTACK_CALLBACK_URL,
  },
  daraja: {
    consumerKey: process.env.DARAJA_CONSUMER_KEY,
    consumerSecret: process.env.DARAJA_CONSUMER_SECRET,
    shortcode: process.env.DARAJA_SHORTCODE,
    passkey: process.env.DARAJA_PASSKEY,
    callbackUrl: process.env.DARAJA_CALLBACK_URL,
    resultUrl: process.env.DARAJA_RESULT_URL,
    timeoutUrl: process.env.DARAJA_TIMEOUT_URL,
    c2bValidationUrl: process.env.DARAJA_C2B_VALIDATION_URL,
    c2bConfirmationUrl: process.env.DARAJA_C2B_CONFIRMATION_URL,
  },
  kcb: {
    accountName: process.env.KCB_ACCOUNT_NAME,
    accountNumber: process.env.KCB_ACCOUNT_NUMBER,
    branch: process.env.KCB_BRANCH,
    paybill: process.env.KCB_PAYBILL,
    referencePrefix: process.env.KCB_INTERNAL_REFERENCE_PREFIX ?? 'GLM',
  },
}));
