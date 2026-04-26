# Webhook Idempotency

Store webhook payloads before processing. Deduplicate by provider, event id, reference, and payment intent. Posting must be exactly once. If verification fails, store event and mark rejected. If downstream PDF or notification fails, retry via queues without reposting payment.
