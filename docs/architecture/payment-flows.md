# Payment Flows

## Manual M-Pesa, KCB, and Cash

Staff records a draft. If offline, the draft is stored in IndexedDB pending mutations. After sync, the server validates tenant, tenancy, amount, reference uniqueness, and period. The server posts payment, allocates it to charges, creates a receipt, queues PDF generation, and writes audit logs.

## Paystack

The API creates a payment intent and returns `authorization_url`. The callback is not treated as proof. The webhook verifies `x-paystack-signature`, stores raw event, deduplicates, verifies the transaction server-side, confirms amount/currency/reference, posts once, allocates charges, creates receipt, queues notification, and writes audit.

## Daraja STK

The API creates an intent, sends STK push, receives Safaricom callback, matches `CheckoutRequestID`, posts successful payments once, allocates, receipts, notifies, and audits.
