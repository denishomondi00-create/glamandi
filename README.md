# 1. Final Product Definition

Product name: Glamandi Property Management Operating System
Internal name: Glamandi Control Center
Public face: Glamandi Homes website
Private face: Admin, staff, tenant, and landlord portals

The system has five connected faces:

Public Website
Property listings, available units, inquiries, contact forms, SEO pages, and login entry.
Admin / Staff Control Center
Properties, units, tenants, landlords, payments, receipts, penalties, deposits, utilities, repairs, statements, payouts, reports, audit logs, and website control.
Tenant Portal
Rent balance, receipts, penalties, utilities, deposit status, notices, repair requests, and payment options.
Landlord Portal
Properties owned, occupancy, landlord statements, repair deductions, payout history, and documents.
Offline Operations Layer
Local cached dashboard, tenant/unit data, offline payment drafts, offline repair logs, offline inquiry capture, and sync queue.

That last part matters. Internet issues in property management are not “edge cases.” They are Tuesday.

2. Core Architecture
Public Website
    ↓ reads live public listing data
apps/web, Next.js
    ↓ authenticated API calls
apps/api, NestJS REST API
    ↓ stores canonical business data
MongoDB Community Replica Set
    ↓ enqueues operational jobs
Redis + BullMQ
    ↓ processes background workflows
apps/worker

Offline Admin/Staff PWA
    ↓ caches safe operational data
Service Worker + IndexedDB
    ↓ queues offline mutations
Offline Outbox
    ↓ syncs when online
POST /sync/push
    ↓ resolves conflicts server-side
Sync Module + Audit Logs
Main rule

MongoDB is the source of truth. IndexedDB is only a temporary offline working copy.
Do not let offline mode become a second fake database, because that is how humans invent accounting disasters and then call them “bugs.”

3. Complete Monorepo Structure
glamandi/
│
├── apps/
│   │
│   ├── web/                                      # Next.js website + all portals + offline PWA
│   │   │
│   │   ├── app/
│   │   │   │
│   │   │   ├── (marketing)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx                     # /
│   │   │   │   ├── about/page.tsx               # /about
│   │   │   │   ├── services/page.tsx            # /services
│   │   │   │   ├── properties/page.tsx          # /properties
│   │   │   │   ├── properties/[propertySlug]/page.tsx
│   │   │   │   ├── units/[unitSlug]/page.tsx
│   │   │   │   ├── contact/page.tsx
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── offline/page.tsx             # offline fallback page
│   │   │   │   ├── privacy/page.tsx
│   │   │   │   └── terms/page.tsx
│   │   │   │
│   │   │   ├── (admin)/
│   │   │   │   └── admin/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx                 # command center
│   │   │   │       ├── properties/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/
│   │   │   │       │       ├── page.tsx
│   │   │   │       │       ├── units/page.tsx
│   │   │   │       │       ├── location/page.tsx
│   │   │   │       │       └── listing/page.tsx
│   │   │   │       ├── units/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/
│   │   │   │       │       ├── page.tsx
│   │   │   │       │       ├── location/page.tsx
│   │   │   │       │       ├── tenant/page.tsx
│   │   │   │       │       ├── charges/page.tsx
│   │   │   │       │       └── repairs/page.tsx
│   │   │   │       ├── tenants/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/
│   │   │   │       │       ├── page.tsx
│   │   │   │       │       ├── tenancy/page.tsx
│   │   │   │       │       ├── charges/page.tsx
│   │   │   │       │       ├── payments/page.tsx
│   │   │   │       │       ├── receipts/page.tsx
│   │   │   │       │       ├── penalties/page.tsx
│   │   │   │       │       ├── deposit/page.tsx
│   │   │   │       │       ├── utilities/page.tsx
│   │   │   │       │       ├── repairs/page.tsx
│   │   │   │       │       └── statement/page.tsx
│   │   │   │       ├── landlords/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/
│   │   │   │       │       ├── page.tsx
│   │   │   │       │       ├── properties/page.tsx
│   │   │   │       │       ├── statements/page.tsx
│   │   │   │       │       ├── payouts/page.tsx
│   │   │   │       │       ├── deductions/page.tsx
│   │   │   │       │       └── repairs/page.tsx
│   │   │   │       ├── tenancies/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/
│   │   │   │       │       ├── page.tsx
│   │   │   │       │       ├── move-out/page.tsx
│   │   │   │       │       ├── transfer/page.tsx
│   │   │   │       │       └── notice/page.tsx
│   │   │   │       ├── charges/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── new/page.tsx
│   │   │   │       ├── payments/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   ├── manual-mpesa/page.tsx
│   │   │   │       │   ├── manual-kcb/page.tsx
│   │   │   │       │   ├── cash/page.tsx
│   │   │   │       │   ├── paystack/page.tsx
│   │   │   │       │   ├── daraja-stk/page.tsx
│   │   │   │       │   └── reconciliation/page.tsx
│   │   │   │       ├── receipts/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── [id]/page.tsx
│   │   │   │       ├── penalties/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── exceptions/page.tsx
│   │   │   │       │   └── manual/page.tsx
│   │   │   │       ├── deposits/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── refund-requests/page.tsx
│   │   │   │       │   └── exit-reviews/page.tsx
│   │   │   │       ├── utilities/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── new/page.tsx
│   │   │   │       ├── repairs/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/page.tsx
│   │   │   │       ├── statements/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── landlords/page.tsx
│   │   │   │       │   └── tenants/page.tsx
│   │   │   │       ├── payouts/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── [id]/page.tsx
│   │   │   │       ├── inquiries/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── [id]/page.tsx
│   │   │   │       ├── offline-sync/
│   │   │   │       │   ├── page.tsx             # outbox, conflicts, sync status
│   │   │   │       │   ├── outbox/page.tsx
│   │   │   │       │   └── conflicts/page.tsx
│   │   │   │       ├── website/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── listings/page.tsx
│   │   │   │       │   ├── featured/page.tsx
│   │   │   │       │   ├── pages/page.tsx
│   │   │   │       │   └── seo/page.tsx
│   │   │   │       ├── reports/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── collections/page.tsx
│   │   │   │       │   ├── occupancy/page.tsx
│   │   │   │       │   ├── defaulters/page.tsx
│   │   │   │       │   ├── penalties/page.tsx
│   │   │   │       │   ├── commission/page.tsx
│   │   │   │       │   ├── repairs/page.tsx
│   │   │   │       │   ├── deposits/page.tsx
│   │   │   │       │   ├── inquiries/page.tsx
│   │   │   │       │   └── payment-channels/page.tsx
│   │   │   │       ├── users/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   ├── new/page.tsx
│   │   │   │       │   └── [id]/page.tsx
│   │   │   │       ├── roles/page.tsx
│   │   │   │       ├── audit/page.tsx
│   │   │   │       └── settings/
│   │   │   │           ├── page.tsx
│   │   │   │           ├── business-rules/page.tsx
│   │   │   │           ├── penalty-rules/page.tsx
│   │   │   │           ├── commission-rules/page.tsx
│   │   │   │           ├── deposit-rules/page.tsx
│   │   │   │           ├── payment-methods/page.tsx
│   │   │   │           ├── offline-rules/page.tsx
│   │   │   │           ├── notification-rules/page.tsx
│   │   │   │           └── website-rules/page.tsx
│   │   │   │
│   │   │   ├── (tenant)/
│   │   │   │   └── tenant/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       ├── unit/page.tsx
│   │   │   │       ├── charges/page.tsx
│   │   │   │       ├── payments/page.tsx
│   │   │   │       ├── receipts/page.tsx
│   │   │   │       ├── penalties/page.tsx
│   │   │   │       ├── deposit/page.tsx
│   │   │   │       ├── utilities/page.tsx
│   │   │   │       ├── repairs/page.tsx
│   │   │   │       ├── repairs/new/page.tsx
│   │   │   │       ├── notices/page.tsx
│   │   │   │       └── profile/page.tsx
│   │   │   │
│   │   │   ├── (landlord)/
│   │   │   │   └── landlord/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       ├── properties/page.tsx
│   │   │   │       ├── occupancy/page.tsx
│   │   │   │       ├── statements/page.tsx
│   │   │   │       ├── statements/[id]/page.tsx
│   │   │   │       ├── payouts/page.tsx
│   │   │   │       ├── repairs/page.tsx
│   │   │   │       ├── deductions/page.tsx
│   │   │   │       ├── documents/page.tsx
│   │   │   │       └── profile/page.tsx
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── health/route.ts
│   │   │   │   ├── proxy/[...path]/route.ts
│   │   │   │   ├── paystack/callback/route.ts
│   │   │   │   ├── sync/status/route.ts
│   │   │   │   └── offline/manifest/route.ts
│   │   │   │
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── nav/
│   │   │   ├── cards/
│   │   │   ├── tables/
│   │   │   ├── forms/
│   │   │   ├── charts/
│   │   │   ├── feedback/
│   │   │   ├── auth/
│   │   │   ├── website/
│   │   │   ├── portal/
│   │   │   └── offline/
│   │   │       ├── offline-banner.tsx
│   │   │       ├── sync-status-badge.tsx
│   │   │       ├── outbox-table.tsx
│   │   │       └── conflict-resolution-panel.tsx
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── properties/
│   │   │   ├── units/
│   │   │   ├── tenants/
│   │   │   ├── landlords/
│   │   │   ├── tenancies/
│   │   │   ├── inquiries/
│   │   │   ├── charges/
│   │   │   ├── payments/
│   │   │   ├── receipts/
│   │   │   ├── penalties/
│   │   │   ├── deposits/
│   │   │   ├── utilities/
│   │   │   ├── repairs/
│   │   │   ├── statements/
│   │   │   ├── payouts/
│   │   │   ├── reports/
│   │   │   ├── website/
│   │   │   ├── users/
│   │   │   ├── audit/
│   │   │   ├── settings/
│   │   │   └── offline-sync/
│   │   │       ├── components/
│   │   │       ├── queries/
│   │   │       ├── mutations/
│   │   │       ├── server/
│   │   │       ├── schemas/
│   │   │       └── utils/
│   │   │
│   │   ├── lib/
│   │   │   ├── api-client/
│   │   │   │   ├── client.ts
│   │   │   │   ├── fetcher.ts
│   │   │   │   ├── server-fetcher.ts
│   │   │   │   ├── offline-aware-fetcher.ts
│   │   │   │   ├── errors.ts
│   │   │   │   └── response.ts
│   │   │   ├── auth/
│   │   │   │   ├── session.ts
│   │   │   │   ├── guards.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   └── cookies.ts
│   │   │   ├── offline/
│   │   │   │   ├── db.ts                  # IndexedDB setup
│   │   │   │   ├── stores.ts              # local object stores
│   │   │   │   ├── outbox.ts              # queued offline mutations
│   │   │   │   ├── sync-client.ts         # push/pull sync logic
│   │   │   │   ├── conflict-policy.ts
│   │   │   │   ├── cache-policy.ts
│   │   │   │   ├── network-status.ts
│   │   │   │   └── encryption.ts          # optional local encryption helpers
│   │   │   ├── service-worker/
│   │   │   │   ├── register-sw.ts
│   │   │   │   ├── cache-routes.ts
│   │   │   │   └── background-sync.ts
│   │   │   ├── utils/
│   │   │   │   ├── urls.ts
│   │   │   │   ├── currency.ts
│   │   │   │   ├── dates.ts
│   │   │   │   ├── numbers.ts
│   │   │   │   ├── phones.ts
│   │   │   │   ├── locations.ts
│   │   │   │   ├── formatters.ts
│   │   │   │   ├── constants.ts
│   │   │   │   └── validators.ts
│   │   │   └── metadata/
│   │   │       ├── seo.ts
│   │   │       └── open-graph.ts
│   │   │
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── middleware.ts
│   │   ├── public/
│   │   │   ├── manifest.webmanifest
│   │   │   ├── sw.js
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logos/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── postcss.config.js
│   │   └── .env.example
│   │
│   ├── api/                                      # NestJS backend
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── constants/
│   │   │   │   ├── decorators/
│   │   │   │   ├── dto/
│   │   │   │   ├── exceptions/
│   │   │   │   ├── filters/
│   │   │   │   ├── guards/
│   │   │   │   ├── interceptors/
│   │   │   │   ├── middleware/
│   │   │   │   ├── pipes/
│   │   │   │   ├── serializers/
│   │   │   │   └── utils/
│   │   │   │       ├── money.ts
│   │   │   │       ├── dates.ts
│   │   │   │       ├── ids.ts
│   │   │   │       ├── phones.ts
│   │   │   │       ├── pagination.ts
│   │   │   │       └── mongo-session.ts
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── app.config.ts
│   │   │   │   ├── auth.config.ts
│   │   │   │   ├── db.config.ts
│   │   │   │   ├── redis.config.ts
│   │   │   │   ├── storage.config.ts
│   │   │   │   ├── payments.config.ts
│   │   │   │   ├── queue.config.ts
│   │   │   │   ├── website.config.ts
│   │   │   │   ├── notifications.config.ts
│   │   │   │   ├── offline-sync.config.ts
│   │   │   │   └── swagger.config.ts
│   │   │   │
│   │   │   ├── database/
│   │   │   │   ├── mongo.module.ts
│   │   │   │   ├── mongo.providers.ts
│   │   │   │   ├── indexes/create-indexes.ts
│   │   │   │   └── schemas/
│   │   │   │       ├── user.schema.ts
│   │   │   │       ├── role.schema.ts
│   │   │   │       ├── permission.schema.ts
│   │   │   │       ├── landlord.schema.ts
│   │   │   │       ├── property.schema.ts
│   │   │   │       ├── unit.schema.ts
│   │   │   │       ├── tenant.schema.ts
│   │   │   │       ├── tenancy.schema.ts
│   │   │   │       ├── inquiry.schema.ts
│   │   │   │       ├── website-listing.schema.ts
│   │   │   │       ├── charge.schema.ts
│   │   │   │       ├── payment.schema.ts
│   │   │   │       ├── payment-allocation.schema.ts
│   │   │   │       ├── payment-intent.schema.ts
│   │   │   │       ├── receipt.schema.ts
│   │   │   │       ├── penalty.schema.ts
│   │   │   │       ├── communication-exception.schema.ts
│   │   │   │       ├── deposit-ledger.schema.ts
│   │   │   │       ├── utility-charge.schema.ts
│   │   │   │       ├── repair-ticket.schema.ts
│   │   │   │       ├── repair-expense.schema.ts
│   │   │   │       ├── landlord-statement.schema.ts
│   │   │   │       ├── landlord-payout.schema.ts
│   │   │   │       ├── document.schema.ts
│   │   │   │       ├── notification.schema.ts
│   │   │   │       ├── audit-log.schema.ts
│   │   │   │       ├── setting.schema.ts
│   │   │   │       ├── commission-rule.schema.ts
│   │   │   │       ├── penalty-rule.schema.ts
│   │   │   │       ├── deposit-rule.schema.ts
│   │   │   │       ├── payment-method.schema.ts
│   │   │   │       ├── offline-client.schema.ts
│   │   │   │       ├── offline-sync-batch.schema.ts
│   │   │   │       ├── sync-conflict.schema.ts
│   │   │   │       └── webhook-event.schema.ts
│   │   │   │
│   │   │   ├── modules/
│   │   │   │   ├── health/
│   │   │   │   ├── auth/
│   │   │   │   ├── users/
│   │   │   │   ├── roles/
│   │   │   │   ├── landlords/
│   │   │   │   ├── properties/
│   │   │   │   ├── units/
│   │   │   │   ├── tenants/
│   │   │   │   ├── tenancies/
│   │   │   │   ├── inquiries/
│   │   │   │   ├── charges/
│   │   │   │   ├── payments/
│   │   │   │   ├── receipts/
│   │   │   │   ├── penalties/
│   │   │   │   ├── deposits/
│   │   │   │   ├── utilities/
│   │   │   │   ├── repairs/
│   │   │   │   ├── statements/
│   │   │   │   ├── payouts/
│   │   │   │   ├── reports/
│   │   │   │   ├── website/
│   │   │   │   ├── notifications/
│   │   │   │   ├── documents/
│   │   │   │   ├── webhooks/
│   │   │   │   ├── audit/
│   │   │   │   ├── settings/
│   │   │   │   └── sync/                  # offline push/pull conflict engine
│   │   │   │
│   │   │   ├── integrations/
│   │   │   │   ├── paystack/
│   │   │   │   ├── daraja/
│   │   │   │   ├── kcb/
│   │   │   │   ├── storage/
│   │   │   │   └── redis/
│   │   │   │
│   │   │   ├── queue/
│   │   │   │   ├── queue.module.ts
│   │   │   │   ├── queue.constants.ts
│   │   │   │   ├── queue.names.ts
│   │   │   │   ├── queue.factory.ts
│   │   │   │   ├── jobs/
│   │   │   │   └── schedulers/
│   │   │   │
│   │   │   ├── templates/
│   │   │   │   ├── emails/
│   │   │   │   └── pdf/
│   │   │   │
│   │   │   ├── swagger/setup-swagger.ts
│   │   │   └── tests/
│   │   │       ├── unit/
│   │   │       ├── integration/
│   │   │       └── e2e/
│   │   │
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   └── .env.example
│   │
│   └── worker/                                  # BullMQ workers and schedulers
│       ├── src/
│       │   ├── main.ts
│       │   ├── worker.module.ts
│       │   ├── bootstrap/
│       │   │   ├── register-workers.ts
│       │   │   └── register-schedulers.ts
│       │   ├── processors/
│       │   │   ├── rent-generation.processor.ts
│       │   │   ├── penalty-evaluation.processor.ts
│       │   │   ├── statement-generation.processor.ts
│       │   │   ├── receipt-generation.processor.ts
│       │   │   ├── notification.processor.ts
│       │   │   ├── inquiry-followup.processor.ts
│       │   │   ├── website-sync.processor.ts
│       │   │   ├── repair-reminder.processor.ts
│       │   │   ├── export-generation.processor.ts
│       │   │   ├── payment-reconciliation.processor.ts
│       │   │   └── offline-sync-cleanup.processor.ts
│       │   ├── services/
│       │   ├── queues/
│       │   └── utils/
│       ├── package.json
│       ├── tsconfig.json
│       └── .env.example
│
├── packages/
│   ├── types/
│   │   └── src/
│   │       ├── api.ts
│   │       ├── auth.ts
│   │       ├── users.ts
│   │       ├── roles.ts
│   │       ├── landlords.ts
│   │       ├── properties.ts
│   │       ├── units.ts
│   │       ├── tenants.ts
│   │       ├── tenancies.ts
│   │       ├── inquiries.ts
│   │       ├── charges.ts
│   │       ├── payments.ts
│   │       ├── receipts.ts
│   │       ├── penalties.ts
│   │       ├── deposits.ts
│   │       ├── utilities.ts
│   │       ├── repairs.ts
│   │       ├── statements.ts
│   │       ├── payouts.ts
│   │       ├── reports.ts
│   │       ├── settings.ts
│   │       ├── website.ts
│   │       ├── audit.ts
│   │       ├── documents.ts
│   │       ├── notifications.ts
│   │       ├── offline-sync.ts
│   │       └── index.ts
│   │
│   ├── contracts/
│   │   └── src/
│   │       ├── routes.ts
│   │       ├── permissions.ts
│   │       ├── roles.ts
│   │       ├── queue-names.ts
│   │       ├── webhook-events.ts
│   │       ├── payment-methods.ts
│   │       ├── payment-status.ts
│   │       ├── charge-status.ts
│   │       ├── charge-types.ts
│   │       ├── unit-status.ts
│   │       ├── tenancy-status.ts
│   │       ├── inquiry-status.ts
│   │       ├── repair-status.ts
│   │       ├── payout-status.ts
│   │       ├── penalty-types.ts
│   │       ├── document-types.ts
│   │       ├── sync-status.ts
│   │       └── index.ts
│   │
│   ├── ui/
│   ├── utils/
│   ├── sync/                                    # shared offline sync contracts/helpers
│   │   └── src/
│   │       ├── mutation-envelope.ts
│   │       ├── conflict-types.ts
│   │       ├── sync-operations.ts
│   │       ├── merge-policy.ts
│   │       └── index.ts
│   └── config/
│
├── infra/
│   ├── docker/
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── mongo/
│   │   │   ├── mongod.conf
│   │   │   └── rs-init.js
│   │   ├── redis/redis.conf
│   │   ├── nginx/nginx.conf
│   │   ├── api/Dockerfile
│   │   ├── web/Dockerfile
│   │   └── worker/Dockerfile
│   ├── scripts/
│   │   ├── bootstrap.sh
│   │   ├── deploy.sh
│   │   ├── backup-mongo.sh
│   │   ├── restore-mongo.sh
│   │   ├── verify-backup.sh
│   │   ├── create-admin.ts
│   │   ├── seed-dev.ts
│   │   └── seed-demo.ts
│   ├── monitoring/
│   │   ├── prometheus.yml
│   │   └── grafana/
│   ├── ssl/
│   └── backups/
│
├── docs/
│   ├── architecture/
│   │   ├── system-overview.md
│   │   ├── module-map.md
│   │   ├── data-model.md
│   │   ├── payment-flows.md
│   │   ├── webhook-flows.md
│   │   ├── queue-flows.md
│   │   ├── offline-sync-flow.md
│   │   └── deployment-architecture.md
│   ├── api/
│   │   ├── openapi.yaml
│   │   └── postman_collection.json
│   ├── operations/
│   │   ├── admin-sop.md
│   │   ├── staff-sop.md
│   │   ├── payout-sop.md
│   │   ├── reconciliation-sop.md
│   │   ├── backup-recovery-sop.md
│   │   ├── offline-operations-sop.md
│   │   └── incident-response-sop.md
│   ├── product/
│   │   ├── business-rules.md
│   │   ├── screen-map.md
│   │   ├── permissions-matrix.md
│   │   ├── reporting-spec.md
│   │   ├── tenant-portal-guide.md
│   │   └── landlord-portal-guide.md
│   └── technical/
│       ├── coding-standards.md
│       ├── database-indexes.md
│       ├── audit-policy.md
│       ├── finance-ledger-policy.md
│       ├── webhook-idempotency.md
│       └── offline-sync-policy.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       ├── backup-check.yml
│       └── security-scan.yml
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .gitignore
├── .env.example
└── README.md
4. Directory Connection Lines

This is how files must talk to each other. Keep this rule sacred, unlike most “quick fixes” that later become fossilized suffering.

Admin route page
    → apps/web/app/(admin)/admin/payments/new/page.tsx
    → apps/web/features/payments/server/get-payment-context.ts
    → apps/web/features/payments/components/payment-form.tsx
    → apps/web/features/payments/mutations/use-create-manual-mpesa-payment.ts
    → apps/web/lib/api-client/client.ts
    → packages/contracts/src/routes.ts
    → apps/api/src/modules/payments/payments.controller.ts
    → apps/api/src/modules/payments/payments.service.ts
    → apps/api/src/modules/payments/payment-posting.service.ts
    → apps/api/src/modules/payments/allocators/payment-allocation.service.ts
    → apps/api/src/modules/receipts/receipts.service.ts
    → apps/api/src/queue/jobs/enqueue-receipt-generation.job.ts
    → apps/api/src/modules/audit/audit.service.ts
    → MongoDB schemas

Offline payment draft
    → apps/web/features/payments/components/manual-mpesa-form.tsx
    → apps/web/lib/offline/outbox.ts
    → IndexedDB pending_mutations store
    → apps/web/lib/offline/sync-client.ts
    → POST /api/v1/sync/push
    → apps/api/src/modules/sync/sync.controller.ts
    → apps/api/src/modules/sync/sync.service.ts
    → payments/payment-posting.service.ts
    → audit/audit.service.ts
    → sync-conflict.schema.ts if conflict happens

Website inquiry
    → apps/web/app/(marketing)/contact/page.tsx
    → apps/web/features/inquiries/components/inquiry-form.tsx
    → POST /api/v1/inquiries
    → inquiries.controller.ts
    → inquiries.service.ts
    → inquiry.schema.ts
    → enqueue-inquiry-followup.job.ts

Unit availability change
    → admin updates unit status
    → PATCH /api/v1/units/:id/status
    → units.service.ts
    → website-sync queue
    → website-sync.processor.ts
    → website-listing.schema.ts
    → public website listing updates

Paystack payment
    → POST /api/v1/payments/initialize/paystack
    → payment_intent created
    → Paystack authorization_url returned
    → user pays
    → /api/paystack/callback receives reference
    → POST /api/v1/payments/verify/paystack
    → Paystack webhook also hits /api/v1/webhooks/paystack
    → webhook verifies signature
    → transaction verified server-side
    → payment posted once
    → allocations created
    → receipt created
    → receipt PDF queued
    → audit log written

Daraja STK payment
    → POST /api/v1/payments/initialize/daraja-stk
    → payment_intent created
    → STK push sent
    → Safaricom callback hits /api/v1/webhooks/daraja/stk-callback
    → checkout_request_id matched
    → payment posted if successful
    → receipt generated
    → audit log written
5. Offline Mode Design
Offline must support

Admin and staff should be able to do these even when internet is poor:

View cached dashboard summary
View cached tenants
View cached landlords
View cached properties
View cached units
Record manual M-Pesa payment draft
Record manual KCB payment draft
Record cash payment draft
Log repair ticket
Capture inquiry
Add communication exception note
Create tenant note
Prepare utility charge draft
Prepare penalty waiver request
Prepare landlord repair expense draft
Offline must not fully finalize

These must wait for internet:

Official receipt number generation
Official payment posting
Paystack payment
Daraja STK push
Landlord statement final generation
Landlord payout marking
Penalty auto-evaluation
Final audit commit
PDF generation
Webhook processing

Reason: payment verification and official finance posting require server truth. Paystack specifically requires transaction verification because a callback URL visit alone is not proof of payment, and Paystack webhooks carry x-paystack-signature that must be validated before processing.

Offline local stores
IndexedDB database: glamandi_offline

stores:
    cached_users
    cached_properties
    cached_units
    cached_tenants
    cached_landlords
    cached_charges
    cached_receipts
    cached_settings
    pending_mutations
    sync_batches
    sync_conflicts
    offline_files
Offline mutation envelope
type OfflineMutationEnvelope = {
  localId: string;
  operation:
    | 'CREATE_MANUAL_MPESA_PAYMENT'
    | 'CREATE_MANUAL_KCB_PAYMENT'
    | 'CREATE_CASH_PAYMENT'
    | 'CREATE_REPAIR_TICKET'
    | 'CREATE_INQUIRY'
    | 'CREATE_TENANT_NOTE'
    | 'CREATE_COMMUNICATION_EXCEPTION'
    | 'CREATE_UTILITY_CHARGE_DRAFT'
    | 'REQUEST_PENALTY_WAIVER';

  payload: unknown;
  entityType: string;
  entityLocalId?: string;
  entityServerId?: string;
  createdAt: string;
  createdBy: string;
  deviceId: string;
  clientVersion: string;
  status: 'pending' | 'syncing' | 'synced' | 'failed' | 'conflict';
};
Offline sync rules
Client pulls latest safe data:
    GET /api/v1/sync/bootstrap
    GET /api/v1/sync/pull?since=timestamp

Client pushes offline changes:
    POST /api/v1/sync/push

Server returns:
    accepted mutations
    rejected mutations
    conflicts
    server corrections
    new canonical records
Conflict examples
Offline payment recorded for tenant, but tenant moved out before sync
    → conflict

Offline repair logged for unit, but unit deleted/merged
    → conflict

Offline payment reference already exists
    → duplicate conflict

Offline utility charge added for closed tenancy
    → conflict

Offline cash payment posted by staff while admin already posted same payment online
    → possible duplicate, requires reconciliation
Conflict resolution policy
Financial records:
    server wins by default
    duplicate references blocked
    admin must resolve conflicts manually

Tenant notes:
    merge allowed

Repair tickets:
    merge if unit and tenancy are still valid

Inquiries:
    merge unless same phone + same interested unit within duplicate window

Settings:
    offline edits not allowed
6. Property and Unit Location Model

Put location mainly on property, then add unit-level access details. Do not scatter full GPS data across every unit like a developer throwing rice at a wedding.

Property location
property.location = {
  country: 'Kenya',
  county: 'Kilifi',
  town: 'Mtwapa',
  area: 'Mtwapa',
  estate: 'Optional estate name',
  street: 'Optional street name',
  buildingName: 'Glamandi Homes',
  landmark: 'Near ...',
  postalAddress: '',
  latitude: -3.947,
  longitude: 39.744,
  googleMapUrl: '',
  directionsNote: 'Use this note for visitors, tenants, and technicians',
  publicAddressLabel: 'Mtwapa, Kilifi County'
};
Unit location detail
unit.location_detail = {
  blockName: 'Block A',
  floor: '2nd Floor',
  wing: 'Left Wing',
  doorNumber: 'A-204',
  unitLabel: 'Block A, 2nd Floor, Door A-204',
  accessNote: 'Use side staircase',
  visibleOnWebsite: true
};
Tenancy location snapshot

Store this at tenancy creation:

tenancy.property_location_snapshot = {
  propertyName: 'Glamandi Homes',
  county: 'Kilifi',
  town: 'Mtwapa',
  area: 'Mtwapa',
  buildingName: 'Glamandi Homes',
  unitLabel: 'Block A, 2nd Floor, Door A-204'
};

Why this matters:

Property location changes later
    → old receipts and statements remain accurate

Unit label changes later
    → historical tenant records remain accurate

Repair dispatch
    → technician sees exact block/floor/door

Website listing
    → public sees general location, not sensitive internal access notes
7. Payment Methods

The system should support:

1. Manual M-Pesa
2. Manual KCB Bank
3. Cash
4. Paystack hosted checkout
5. Daraja STK Push
6. Future Daraja C2B Paybill confirmation

Safaricom’s Daraja platform provides access to M-PESA APIs for web and mobile integrations, so design Daraja into the architecture even if launch begins with manual M-Pesa recording.

Payment methods schema
payment_method = {
  _id,
  code:
    | 'mpesa_manual'
    | 'kcb_manual'
    | 'cash'
    | 'paystack'
    | 'daraja_stk'
    | 'daraja_c2b',
  name,
  status: 'active' | 'inactive',
  requiresProof: boolean,
  supportsWebhook: boolean,
  supportsAutoVerification: boolean,
  supportsOfflineDraft: boolean,
  config: {
    paybillNumber,
    tillNumber,
    bankName,
    accountName,
    accountNumber,
    paystackPublicKey,
    callbackUrl
  },
  created_at,
  updated_at
};
Offline payment behavior
Manual M-Pesa:
    can be drafted offline
    syncs later
    official receipt generated after server accepts it

Manual KCB:
    can be drafted offline
    proof can be attached later or stored locally first
    official receipt generated after sync

Cash:
    can be drafted offline
    server must confirm official receipt

Paystack:
    online only
    cannot initialize offline
    cannot verify offline

Daraja STK:
    online only
    cannot initiate offline
    callback requires server

Daraja C2B:
    server-side only
    cannot be created from offline browser
8. API Endpoint Map

Base URL:

/api/v1
Health
GET /health
Auth
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /auth/me
POST /auth/forgot-password
POST /auth/reset-password
Users, roles, permissions
GET    /users
POST   /users
GET    /users/:id
PATCH  /users/:id
DELETE /users/:id

GET    /roles
POST   /roles
GET    /roles/:id
PATCH  /roles/:id

GET    /permissions
Landlords
GET   /landlords
POST  /landlords
GET   /landlords/:id
PATCH /landlords/:id
GET   /landlords/:id/properties
GET   /landlords/:id/statements
GET   /landlords/:id/payouts
GET   /landlords/:id/repairs
GET   /landlords/:id/deductions
GET   /landlords/:id/documents
Properties
GET    /properties
POST   /properties
GET    /properties/:id
PATCH  /properties/:id
DELETE /properties/:id
GET    /properties/:id/units
GET    /properties/:id/occupancy
GET    /properties/:id/statement-summary
GET    /properties/:id/location
PATCH  /properties/:id/location
PATCH  /properties/:id/publish
PATCH  /properties/:id/feature
Units
GET   /units
POST  /units
GET   /units/:id
PATCH /units/:id
GET   /units/:id/location
PATCH /units/:id/location
PATCH /units/:id/status
PATCH /units/:id/lock-status
PATCH /units/:id/publish
GET   /units/:id/tenant
GET   /units/:id/charges
GET   /units/:id/repairs
Tenants
GET   /tenants
POST  /tenants
GET   /tenants/:id
PATCH /tenants/:id
GET   /tenants/:id/charges
GET   /tenants/:id/payments
GET   /tenants/:id/receipts
GET   /tenants/:id/penalties
GET   /tenants/:id/deposit
GET   /tenants/:id/utilities
GET   /tenants/:id/repairs
GET   /tenants/:id/statement
POST  /tenants/:id/notice
POST  /tenants/:id/communication-exception
Tenancies
GET  /tenancies
POST /tenancies
GET  /tenancies/:id
PATCH /tenancies/:id
POST /tenancies/:id/move-out
POST /tenancies/:id/transfer-unit
POST /tenancies/:id/notice
POST /tenancies/:id/exit-review
Inquiries / CRM
GET  /inquiries
POST /inquiries
GET  /inquiries/:id
PATCH /inquiries/:id
POST /inquiries/:id/assign
POST /inquiries/:id/convert
POST /inquiries/:id/lost
POST /inquiries/:id/follow-up
Charges
GET  /charges
POST /charges
GET  /charges/:id
PATCH /charges/:id
POST /charges/:id/void
POST /charges/generate-monthly-rent
POST /charges/generate-move-in-charges
Payments
GET  /payments
POST /payments
GET  /payments/:id
POST /payments/:id/reverse

POST /payments/manual/mpesa
POST /payments/manual/kcb
POST /payments/manual/cash

POST /payments/initialize/paystack
POST /payments/verify/paystack

POST /payments/initialize/daraja-stk
POST /payments/verify/daraja-stk

GET  /payments/reconciliation
POST /payments/reconciliation/run
POST /payments/reconciliation/:id/resolve
Receipts
GET  /receipts
GET  /receipts/:id
GET  /receipts/:id/pdf
POST /receipts/:id/email
POST /receipts/:id/regenerate-pdf
Penalties
GET   /penalties
POST  /penalties
PATCH /penalties/:id/waive
PATCH /penalties/:id/apply
PATCH /penalties/:id/reason
POST  /penalties/evaluate
POST  /penalties/communication-exceptions
Deposits
GET  /deposits
POST /deposits
GET  /deposits/:id
POST /deposits/:id/refund-request
POST /deposits/:id/refund-approve
POST /deposits/:id/refund-reject
POST /deposits/:id/adjust
POST /deposits/:id/exit-deduction
Utilities
GET  /utilities
POST /utilities
GET  /utilities/:id
PATCH /utilities/:id
POST /utilities/:id/void
Repairs
GET  /repairs
POST /repairs
GET  /repairs/:id
PATCH /repairs/:id
POST /repairs/:id/assign
POST /repairs/:id/complete
POST /repairs/:id/expense
POST /repairs/:id/approve-deduction
POST /repairs/:id/reject-deduction
POST /repairs/:id/upload-proof
Statements
GET  /statements/landlords
GET  /statements/landlords/:id
POST /statements/landlords/generate

GET  /statements/tenants/:tenantId
POST /statements/tenants/generate

GET  /statements/:id/pdf
POST /statements/:id/email
Payouts
GET  /payouts
POST /payouts
GET  /payouts/:id
POST /payouts/:id/mark-paid
POST /payouts/:id/reverse
POST /payouts/:id/upload-proof
Reports
GET  /reports/dashboard
GET  /reports/collections
GET  /reports/occupancy
GET  /reports/defaulters
GET  /reports/penalties
GET  /reports/commission
GET  /reports/repairs
GET  /reports/deposits
GET  /reports/inquiries
GET  /reports/payment-channels
GET  /reports/landlord-payouts
POST /reports/export
Website CMS / listing control
GET   /website/listings
GET   /website/listings/:slug
POST  /website/listings/sync
GET   /website/featured
PATCH /website/properties/:id/publish
PATCH /website/units/:id/publish
PATCH /website/units/:id/feature
GET   /website/pages
PATCH /website/pages/:pageKey
GET   /website/seo
PATCH /website/seo
Offline sync
GET  /sync/bootstrap
GET  /sync/pull
POST /sync/push
GET  /sync/batches
GET  /sync/batches/:id
GET  /sync/conflicts
POST /sync/conflicts/:id/resolve
POST /sync/device/register
POST /sync/device/revoke
Documents
POST   /documents/upload
GET    /documents/:id
DELETE /documents/:id
Notifications
GET  /notifications
POST /notifications/test
POST /notifications/send
POST /notifications/reminders/run
Settings
GET   /settings
PATCH /settings

GET   /settings/business-rules
PATCH /settings/business-rules

GET   /settings/penalty-rules
PATCH /settings/penalty-rules

GET   /settings/commission-rules
PATCH /settings/commission-rules

GET   /settings/deposit-rules
PATCH /settings/deposit-rules

GET   /settings/payment-methods
PATCH /settings/payment-methods

GET   /settings/offline-rules
PATCH /settings/offline-rules

GET   /settings/notification-rules
PATCH /settings/notification-rules

GET   /settings/website-rules
PATCH /settings/website-rules
Audit
GET /audit
GET /audit/:id
Webhooks
POST /webhooks/paystack

POST /webhooks/daraja/stk-callback
POST /webhooks/daraja/result
POST /webhooks/daraja/timeout
POST /webhooks/daraja/c2b-validation
POST /webhooks/daraja/c2b-confirmation

POST /webhooks/internal/worker-health
9. Webhook Alignment
Paystack webhook
POST /api/v1/webhooks/paystack

Responsibilities:

1. Receive raw body
2. Verify x-paystack-signature
3. Store raw event in webhook_events
4. Deduplicate by event id/reference
5. Verify transaction server-side
6. Confirm amount, currency, reference, tenant, and billing period
7. Check payment_intent
8. Check if payment was already posted
9. Post payment exactly once
10. Allocate payment to charges
11. Create receipt
12. Queue receipt PDF generation
13. Queue notification
14. Write audit log
15. Return 200 quickly
Daraja STK callback
POST /api/v1/webhooks/daraja/stk-callback

Responsibilities:

1. Receive Safaricom callback
2. Store raw payload
3. Match CheckoutRequestID to payment_intent
4. Mark payment_intent successful or failed
5. If successful, post payment
6. Allocate payment
7. Create receipt
8. Queue PDF generation
9. Notify tenant/admin
10. Write audit log
Daraja C2B validation and confirmation
POST /api/v1/webhooks/daraja/c2b-validation
POST /api/v1/webhooks/daraja/c2b-confirmation

Use later for Paybill/Till direct payment confirmation.

10. Core Business Rules
Rent due day:
    on or before 5th of every month

Move-in billing:
    1st to 15th:
        full rent + full deposit
    after 15th:
        half rent + full deposit
    next month onward:
        full rent due by 5th

Penalty bands:
    6 to 10 days late:
        KES 500
    11 to 15 days late:
        KES 700
    16 to 30 days late:
        KES 1,000
    whole month default:
        KES 1,400

Penalty exception:
    admin can waive
    admin can impose manually
    reason required
    communication exception must be logged

Deposit:
    deposit is not rent
    tenant cannot consume deposit
    refund requires valid notice
    notice must be one month earlier, between 1st and 5th
    delayed notice requires manual review

Commission:
    Glamandi commission = 10% of collected money from property
    store in commission_rules, not hardcoded

Landlord payout:
    net payout = collected rent - commission - approved repair deductions - landlord withdrawals

Finance:
    never hard delete posted payments
    reverse instead
    every reversal requires reason
    every payment creates allocation
    every payment creates receipt
    every sensitive action writes audit log
11. Queue Design
queues:
    rent-generation
    penalty-evaluation
    statement-generation
    receipt-generation
    notification-dispatch
    website-sync
    inquiry-followup
    repair-reminders
    report-export
    payment-reconciliation
    offline-sync-cleanup

Scheduled jobs:

Monthly rent generation:
    1st of every month

Daily overdue scan:
    from 6th onward

Daily penalty evaluation:
    applies correct band

Monthly landlord statements:
    after billing cycle close

Daily website sync:
    updates available listings

Inquiry follow-up:
    flags stale leads

Repair reminder:
    flags overdue repairs

Payment reconciliation:
    rechecks pending Paystack/Daraja intents

Offline sync cleanup:
    clears old synced local batches and flags stale conflicts
12. Required Imports by Responsibility
apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { setupSwagger } from './swagger/setup-swagger';
apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { LandlordsModule } from './modules/landlords/landlords.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { UnitsModule } from './modules/units/units.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { TenanciesModule } from './modules/tenancies/tenancies.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';
import { ChargesModule } from './modules/charges/charges.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReceiptsModule } from './modules/receipts/receipts.module';
import { PenaltiesModule } from './modules/penalties/penalties.module';
import { DepositsModule } from './modules/deposits/deposits.module';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { RepairsModule } from './modules/repairs/repairs.module';
import { StatementsModule } from './modules/statements/statements.module';
import { PayoutsModule } from './modules/payouts/payouts.module';
import { ReportsModule } from './modules/reports/reports.module';
import { WebsiteModule } from './modules/website/website.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { AuditModule } from './modules/audit/audit.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SyncModule } from './modules/sync/sync.module';
import { QueueModule } from './queue/queue.module';
payments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Payment } from '../../database/schemas/payment.schema';
import { Charge } from '../../database/schemas/charge.schema';
import { PaymentIntent } from '../../database/schemas/payment-intent.schema';

import { PaymentPostingService } from './payment-posting.service';
import { PaymentAllocationService } from './allocators/payment-allocation.service';
import { ReceiptsService } from '../receipts/receipts.service';
import { AuditService } from '../audit/audit.service';

import { EnqueueReceiptGenerationJob } from '../../queue/jobs/enqueue-receipt-generation.job';
import { EnqueueNotificationJob } from '../../queue/jobs/enqueue-notification.job';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { ManualMpesaPaymentDto } from './dto/manual-mpesa-payment.dto';
import { ManualKcbPaymentDto } from './dto/manual-kcb-payment.dto';
sync.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { OfflineSyncBatch } from '../../database/schemas/offline-sync-batch.schema';
import { SyncConflict } from '../../database/schemas/sync-conflict.schema';

import { PaymentsService } from '../payments/payments.service';
import { RepairsService } from '../repairs/repairs.service';
import { InquiriesService } from '../inquiries/inquiries.service';
import { AuditService } from '../audit/audit.service';

import type {
  OfflineMutationEnvelope,
  SyncPushRequest,
  SyncPushResponse,
} from '@glamandi/types/offline-sync';
paystack-webhook.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

import { PaystackClient } from '../../integrations/paystack/paystack.client';
import { verifyPaystackSignature } from '../../integrations/paystack/paystack-signature';

import { WebhookEventsService } from './webhook-events.service';
import { PaymentsService } from '../payments/payments.service';
import { AuditService } from '../audit/audit.service';
daraja-webhook.service.ts
import { Injectable } from '@nestjs/common';

import { DarajaClient } from '../../integrations/daraja/daraja.client';
import { WebhookEventsService } from './webhook-events.service';
import { PaymentsService } from '../payments/payments.service';
import { AuditService } from '../audit/audit.service';
apps/web/lib/offline/db.ts
import { openDB } from 'idb';
import type { DBSchema } from 'idb';

import type { OfflineMutationEnvelope } from '@glamandi/types/offline-sync';
import type { PropertyView } from '@glamandi/types/properties';
import type { UnitView } from '@glamandi/types/units';
import type { TenantView } from '@glamandi/types/tenants';
apps/web/lib/offline/sync-client.ts
import { apiClient } from '@/lib/api-client/client';
import { OFFLINE_SYNC_ROUTES } from '@glamandi/contracts/routes';
import type {
  SyncPushRequest,
  SyncPushResponse,
  SyncPullResponse,
} from '@glamandi/types/offline-sync';

import { getPendingMutations, markMutationSynced, markMutationConflict } from './outbox';
13. Root Environment Variables
NODE_ENV=development
APP_NAME=Glamandi PMOS

APP_URL=http://localhost:3000
API_URL=http://localhost:4000
WORKER_URL=http://localhost:4100

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_TTL=15m
JWT_REFRESH_TTL=7d

MONGO_URI=mongodb://mongo1:27017,mongo2:27017,mongo3:27017/glamandi?replicaSet=rs0
MONGO_DB_NAME=glamandi

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=
PAYSTACK_CALLBACK_URL=http://localhost:3000/api/paystack/callback

DARAJA_CONSUMER_KEY=
DARAJA_CONSUMER_SECRET=
DARAJA_SHORTCODE=
DARAJA_PASSKEY=
DARAJA_CALLBACK_URL=
DARAJA_RESULT_URL=
DARAJA_TIMEOUT_URL=
DARAJA_C2B_VALIDATION_URL=
DARAJA_C2B_CONFIRMATION_URL=

KCB_ACCOUNT_NAME=
KCB_ACCOUNT_NUMBER=
KCB_BRANCH=
KCB_PAYBILL=
KCB_INTERNAL_REFERENCE_PREFIX=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=

S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=

OFFLINE_SYNC_ENABLED=true
OFFLINE_MAX_CACHE_DAYS=14
OFFLINE_MAX_MUTATION_AGE_DAYS=7
OFFLINE_DEVICE_REGISTRATION_REQUIRED=true

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
NEXT_PUBLIC_OFFLINE_ENABLED=true
14. Admin Dashboard Widgets
Total rent billed this month
Total collected this month
Outstanding balances
Late tenants
Penalties triggered
Vacant units
Occupied units
Reserved units
Units under maintenance
Locked units
Glamandi commission earned
Landlord payouts due
Repair deductions pending approval
Pending landlord statements
Recent payments
Manual payments awaiting reconciliation
Offline records pending sync
Sync conflicts requiring admin review
New inquiries
Uncontacted leads
15. Permission Matrix
Admin:
    full system access
    manage users and roles
    manage settings
    change commission rules
    change penalty rules
    reverse payments
    waive penalties
    approve repair deductions
    mark payouts paid
    resolve offline sync conflicts
    view audit logs

Staff:
    view dashboard
    manage tenants
    manage units
    record manual M-Pesa/KCB/cash drafts
    generate receipts after server confirmation
    log repairs
    update inquiries
    view operational reports
    cannot change business rules
    cannot reverse payments without approval
    cannot delete financial records

Tenant:
    view own unit
    view own charges
    view own payments
    download own receipts
    view own penalties
    view own deposit status
    view own utilities
    submit repair requests
    view notices
    update own profile basics

Landlord:
    view owned properties
    view owned units
    view occupancy
    view repair deductions
    download monthly statements
    view payout history
    view documents
16. Final Build Order

Since she paid for the full system, this is engineering order, not client phasing.

1. Monorepo setup
2. Shared contracts, types, utils
3. Docker local infra
4. MongoDB replica set setup
5. Redis setup
6. Auth, users, roles, permissions
7. Property model with location
8. Unit model with unit location detail
9. Landlords
10. Tenants
11. Tenancies
12. Charges
13. Move-in billing rules
14. Deposits
15. Manual M-Pesa payments
16. Manual KCB payments
17. Cash payment recording
18. Payment allocation engine
19. Receipts
20. Offline IndexedDB layer
21. Offline outbox
22. Offline sync endpoints
23. Offline conflict resolution
24. Paystack integration
25. Paystack webhook
26. Daraja STK structure
27. Daraja webhooks
28. Penalty engine
29. Communication exceptions
30. Utilities
31. Repairs
32. Repair deductions
33. Landlord statements
34. Landlord payouts
35. Reports
36. Tenant portal
37. Landlord portal
38. Admin dashboard
39. Public website
40. Website listing sync
41. Inquiries CRM
42. Notifications
43. BullMQ schedulers
44. Audit logs
45. Exporting and PDFs
46. Documentation and SOPs
47. Testing
48. Deployment
49. Training
50. Monthly support plan
17. Long-Term Partner Positioning

Frank should position this as:

Glamandi will not only have a website. You will have a complete property management operating system where your website, tenants, landlords, rent collection, receipts, penalties, repairs, deductions, statements, payouts, and reports all work from one source of truth. The system will also support offline work for poor internet moments, then sync once connection returns.

Monthly support should include:

Hosting management
Database backups
Security updates
Bug fixes
Offline sync monitoring
Payment reconciliation support
Staff training
New report requests
Monthly business review
Website SEO improvements
M-Pesa Daraja upgrade
WhatsApp reminder upgrade
Feature enhancements
