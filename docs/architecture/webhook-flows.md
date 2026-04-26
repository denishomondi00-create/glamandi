# Webhook Flows

Webhook handlers must store raw payloads, verify signatures where available, deduplicate by provider event id/reference, and return quickly.

Paystack requires signature verification and transaction verification before posting. Daraja callbacks require matching to payment intent IDs and result codes. C2B validation and confirmation are prepared for future Paybill/Till direct payment confirmation.
