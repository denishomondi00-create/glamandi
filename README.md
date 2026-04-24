# Glamandi Property Management Operating System

Internal name: Glamandi Control Center
Public face: Glamandi Homes Website
Private face: Admin, Staff, Tenant, and Landlord Portals

This system must become the one place where Glamandi controls:

Properties, units, landlords, tenants, rent, deposits, utilities, penalties, receipts, repairs, deductions, statements, payouts, website listings, inquiries, reports, and audit logs.

The stack is strong for this kind of build: Next.js App Router route groups are suitable because they organize folders without changing URL paths, which fits (marketing), (admin), (tenant), and (landlord) route areas. NestJS is suitable because modules organize application structure, controllers handle incoming requests, and providers/services carry injectable business logic. BullMQ Job Schedulers should be used for recurring jobs because BullMQ says Job Schedulers replace older repeatable jobs from v5.16.0 onward. Paystack must use server-side verification and webhooks, because Paystack says webhooks are preferred over callbacks, the Verify Transaction API confirms status, and webhook events should be verified using x-paystack-signature. MongoDB production should run as a replica set, not a casual standalone database pretending to be serious, because MongoDB documents the three-member replica set as the standard production deployment pattern for redundancy and fault tolerance.

Safaricom Daraja should be designed into the architecture from the beginning, even if launch starts with manual M-Pesa recording. Daraja is Safaricom’s platform for connecting systems to M-PESA APIs, so the structure should be ready for STK Push callbacks and reconciliation later.

1. Final System Architecture
Glamandi Public Website
    |
    | reads public property/unit data
    v
Website Module
    |
    v
Properties + Units + Inquiries

Admin / Staff Control Center
    |
    | manages operations
    v
Tenants + Landlords + Tenancies + Payments + Repairs + Reports

Tenant Portal
    |
    | tenant-scoped access only
    v
Charges + Payments + Receipts + Penalties + Deposits + Repairs

Landlord Portal
    |
    | landlord-scoped access only
    v
Properties + Units + Statements + Payouts + Repairs + Deductions

apps/web
    |
    | HTTP requests
    v
apps/api
    |
    | database reads/writes
    v
MongoDB Replica Set

apps/api
    |
    | queues jobs
    v
Redis + BullMQ
    |
    | processes jobs
    v
apps/worker

External Payment Providers
    |
    | webhooks
    v
apps/api /webhooks/*
2. Runtime Apps
glamandi/
    apps/
        web/       Next.js website, admin portal, tenant portal, landlord portal
        api/       NestJS REST API, domain logic, auth, payments, webhooks
        worker/    BullMQ workers, schedulers, PDF jobs, reminders, sync jobs

    packages/
        types/      shared TypeScript types
        contracts/  route constants, permission constants, queue names, enums
        ui/         reusable UI components
        utils/      shared utility functions
        config/     shared eslint, tsconfig, prettier configs

    infra/
        docker/       local and production Docker files
        nginx/        reverse proxy config
        scripts/      deploy, backup, restore, admin seed scripts
        monitoring/   Prometheus/Grafana configs
        backups/      backup storage folder

    docs/
        architecture/
        api/
        product/
        operations/
        technical/
3. Complete Project Structure
glamandi/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── services/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── properties/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [propertySlug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── units/
│   │   │   │   │   └── [unitSlug]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── contact/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── privacy/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── terms/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── (admin)/
│   │   │   │   └── admin/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx
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
│   │   │   │       ├── repairs/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── new/page.tsx
│   │   │   │       ├── notices/page.tsx
│   │   │   │       └── profile/page.tsx
│   │   │   │
│   │   │   ├── (landlord)/
│   │   │   │   └── landlord/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       ├── properties/page.tsx
│   │   │   │       ├── occupancy/page.tsx
│   │   │   │       ├── statements/
│   │   │   │       │   ├── page.tsx
│   │   │   │       │   └── [id]/page.tsx
│   │   │   │       ├── payouts/page.tsx
│   │   │   │       ├── repairs/page.tsx
│   │   │   │       ├── deductions/page.tsx
│   │   │   │       ├── documents/page.tsx
│   │   │   │       └── profile/page.tsx
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── health/route.ts
│   │   │   │   ├── proxy/[...path]/route.ts
│   │   │   │   └── paystack/callback/route.ts
│   │   │   │
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── error.tsx
│   │   │   └── not-found.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── app-shell.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── topbar.tsx
│   │   │   │   ├── portal-shell.tsx
│   │   │   │   ├── public-header.tsx
│   │   │   │   └── public-footer.tsx
│   │   │   ├── nav/
│   │   │   │   ├── admin-nav.tsx
│   │   │   │   ├── tenant-nav.tsx
│   │   │   │   └── landlord-nav.tsx
│   │   │   ├── cards/
│   │   │   │   ├── metric-card.tsx
│   │   │   │   ├── alert-card.tsx
│   │   │   │   └── finance-summary-card.tsx
│   │   │   ├── tables/
│   │   │   │   ├── data-table.tsx
│   │   │   │   ├── table-actions.tsx
│   │   │   │   └── empty-state.tsx
│   │   │   ├── forms/
│   │   │   │   ├── form-field.tsx
│   │   │   │   ├── currency-input.tsx
│   │   │   │   ├── phone-input.tsx
│   │   │   │   ├── date-picker.tsx
│   │   │   │   ├── location-fields.tsx
│   │   │   │   └── file-upload.tsx
│   │   │   ├── charts/
│   │   │   │   ├── collections-chart.tsx
│   │   │   │   ├── occupancy-chart.tsx
│   │   │   │   └── commission-chart.tsx
│   │   │   ├── feedback/
│   │   │   │   ├── toast.tsx
│   │   │   │   ├── confirm-dialog.tsx
│   │   │   │   └── status-badge.tsx
│   │   │   ├── auth/
│   │   │   │   ├── login-form.tsx
│   │   │   │   ├── guard.tsx
│   │   │   │   └── forbidden.tsx
│   │   │   ├── website/
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── property-card.tsx
│   │   │   │   ├── unit-card.tsx
│   │   │   │   └── inquiry-form.tsx
│   │   │   └── portal/
│   │   │       ├── receipt-download-button.tsx
│   │   │       └── statement-download-button.tsx
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
│   │   │   └── settings/
│   │   │
│   │   ├── lib/
│   │   │   ├── api-client/
│   │   │   │   ├── client.ts
│   │   │   │   ├── fetcher.ts
│   │   │   │   ├── server-fetcher.ts
│   │   │   │   ├── errors.ts
│   │   │   │   └── response.ts
│   │   │   ├── auth/
│   │   │   │   ├── session.ts
│   │   │   │   ├── guards.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   └── cookies.ts
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
│   │   │   ├── use-confirm.ts
│   │   │   ├── use-mobile.ts
│   │   │   └── use-permissions.ts
│   │   ├── store/
│   │   │   └── ui-store.ts
│   │   ├── middleware.ts
│   │   ├── public/
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
│   ├── api/
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   ├── common/
│   │   │   ├── config/
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
│   │   │   │       ├── payment-method.schema.ts
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
│   │   │   │   └── settings/
│   │   │   │
│   │   │   ├── integrations/
│   │   │   │   ├── paystack/
│   │   │   │   ├── daraja/
│   │   │   │   ├── storage/
│   │   │   │   └── redis/
│   │   │   ├── queue/
│   │   │   │   ├── queue.module.ts
│   │   │   │   ├── queue.constants.ts
│   │   │   │   ├── queue.names.ts
│   │   │   │   ├── queue.factory.ts
│   │   │   │   ├── jobs/
│   │   │   │   └── schedulers/
│   │   │   ├── templates/
│   │   │   │   ├── emails/
│   │   │   │   └── pdf/
│   │   │   ├── swagger/setup-swagger.ts
│   │   │   └── tests/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   └── .env.example
│   │
│   └── worker/
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
│       │   │   └── payment-reconciliation.processor.ts
│       │   ├── services/
│       │   ├── queues/
│       │   └── utils/
│       ├── package.json
│       ├── tsconfig.json
│       └── .env.example
│
├── packages/
│   ├── types/
│   ├── contracts/
│   ├── ui/
│   ├── utils/
│   └── config/
│
├── infra/
│   ├── docker/
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── mongo/
│   │   │   ├── mongod.conf
│   │   │   └── rs-init.js
│   │   ├── redis/
│   │   │   └── redis.conf
│   │   ├── nginx/
│   │   │   └── nginx.conf
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
│   │   └── seed-demo.ts
│   ├── monitoring/
│   ├── ssl/
│   └── backups/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── product/
│   ├── operations/
│   └── technical/
│
├── .github/workflows/
│   ├── ci.yml
│   ├── deploy.yml
│   ├── backup-check.yml
│   └── security-scan.yml
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── .gitignore
├── .env.example
└── README.md
4. Frontend Feature Folder Rule

Every feature folder should follow this pattern:

apps/web/features/payments/
├── components/
│   ├── payments-table.tsx
│   ├── payment-form.tsx
│   ├── manual-mpesa-form.tsx
│   ├── manual-kcb-form.tsx
│   ├── cash-payment-form.tsx
│   ├── paystack-payment-button.tsx
│   ├── daraja-stk-form.tsx
│   └── reconciliation-table.tsx
├── queries/
│   ├── use-payments.ts
│   ├── use-payment.ts
│   └── use-reconciliation.ts
├── mutations/
│   ├── use-create-manual-mpesa-payment.ts
│   ├── use-create-manual-kcb-payment.ts
│   ├── use-create-cash-payment.ts
│   ├── use-initialize-paystack-payment.ts
│   ├── use-initialize-daraja-stk.ts
│   └── use-reverse-payment.ts
├── server/
│   ├── get-payments.ts
│   ├── get-payment.ts
│   └── get-reconciliation.ts
├── schemas/
│   ├── payment.schema.ts
│   ├── manual-mpesa.schema.ts
│   ├── manual-kcb.schema.ts
│   ├── cash-payment.schema.ts
│   └── payment-reversal.schema.ts
└── utils/
    ├── payment-labels.ts
    └── payment-status.ts

Frontend connection line:

Route Page
    -> features/*/server/*
    -> lib/api-client/server-fetcher.ts
    -> @glamandi/contracts/routes
    -> API Controller
    -> API Service
    -> Database Schema

Client mutation line:

Client Component
    -> features/*/mutations/*
    -> lib/api-client/client.ts
    -> @glamandi/contracts/routes
    -> API Endpoint
    -> Service
    -> Audit Log
5. Property Location and Unit Location

This part matters. Do not dump everything into the unit. That is how future maintenance teams end up looking for “Room 4” like it is the Ark of the Covenant.

Property owns the main location
property.location = {
  country: "Kenya",
  county: "Kilifi",
  town: "Mtwapa",
  area: "Mtwapa",
  estate: "Optional estate name",
  street: "Optional street name",
  buildingName: "Glamandi Homes",
  landmark: "Near ...",
  postalAddress: "",
  latitude: -3.947,
  longitude: 39.744,
  googleMapUrl: "",
  directionsNote: "Use this note for visitors, tenants, and technicians",
  publicAddressLabel: "Mtwapa, Kilifi County"
}
Unit owns unit-specific location details
unit.location_detail = {
  blockName: "Block A",
  floor: "2nd Floor",
  wing: "Left Wing",
  doorNumber: "A-204",
  unitLabel: "Block A, 2nd Floor, Door A-204",
  accessNote: "Use side staircase",
  visibleOnWebsite: true
}
Tenancy stores a location snapshot
tenancy.property_location_snapshot = {
  propertyName: "Glamandi Homes",
  county: "Kilifi",
  town: "Mtwapa",
  area: "Mtwapa",
  buildingName: "Glamandi Homes",
  unitLabel: "Block A, 2nd Floor, Door A-204"
}

Why this is important:

Property location changes later
    -> old receipts and statements remain accurate

Unit label changes later
    -> old tenancy records remain accurate

Repair ticket created
    -> technician gets property location + unit detail

Website listing
    -> shows public property location + unit label

Landlord statement
    -> references property correctly
6. Backend Module Ownership
auth/
    owns login, refresh, logout, password reset, current user

users/
    owns admin, staff, tenant, landlord user accounts

roles/
    owns RBAC roles and permission seeding

landlords/
    owns landlord profiles and relationship to properties

properties/
    owns property-level data, property location, public listing status

units/
    owns unit data, occupancy, unit location detail, lock status

tenants/
    owns tenant profile data

tenancies/
    owns tenant-to-unit relationship, move-in, move-out, notice, transfer

inquiries/
    owns website leads and CRM follow-up

charges/
    owns rent charges, deposit charges, utility charges, repair/custom charges

payments/
    owns payment posting, allocation, verification, reversals, intents

receipts/
    owns receipt records, numbering, PDF generation trigger

penalties/
    owns late rent rules, waivers, manual penalties, communication exceptions

deposits/
    owns deposit ledger, refund requests, exit review

utilities/
    owns water, electricity, and extra tenant charges

repairs/
    owns maintenance tickets, repair expenses, landlord deductions

statements/
    owns landlord and tenant statements

payouts/
    owns landlord payout creation, marking paid, reversals

reports/
    owns dashboard and exportable reports

website/
    owns public listing visibility, website pages, SEO, sync logic

notifications/
    owns email, SMS, WhatsApp notification dispatch

documents/
    owns uploads and document metadata

webhooks/
    owns Paystack, Daraja, and future provider webhook processing

audit/
    owns audit trail

settings/
    owns configurable business rules
7. Payment Methods

Support all these from the beginning:

1. Manual M-Pesa
2. Manual KCB Bank
3. Cash
4. Paystack Online Payment
5. Daraja Direct M-Pesa STK Push, ready for upgrade
6. Adjustment/Reversal
Payment method schema
payment_method = {
  _id,
  code:
    | "mpesa_manual"
    | "kcb_manual"
    | "cash"
    | "paystack"
    | "daraja_stk"
    | "adjustment",
  name,
  status: "active" | "inactive",
  requiresProof: boolean,
  supportsWebhook: boolean,
  supportsAutoVerification: boolean,
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
}
Manual M-Pesa flow
Admin records payment
    -> POST /payments/manual/mpesa
    -> PaymentsController.manualMpesa()
    -> PaymentsService.createManualMpesa()
    -> PaymentPostingService.postPayment()
    -> PaymentAllocationService.allocate()
    -> ReceiptsService.createReceipt()
    -> enqueue receipt-generation
    -> enqueue notification-dispatch
    -> AuditService.log()

Required fields:

{
  tenant_id,
  tenancy_id,
  property_id,
  unit_id,
  amount,
  mpesa_phone,
  mpesa_reference,
  payment_date,
  billing_period,
  proof_document_id,
  notes
}
Manual KCB flow
Admin records bank payment
    -> POST /payments/manual/kcb
    -> validate bank reference
    -> upload proof if available
    -> post payment
    -> allocate
    -> create receipt
    -> audit log

Required fields:

{
  tenant_id,
  tenancy_id,
  property_id,
  unit_id,
  amount,
  bank_name: "KCB",
  bank_account_reference,
  transaction_reference,
  payment_date,
  billing_period,
  proof_document_id,
  notes
}
Cash flow
Admin records cash payment
    -> POST /payments/manual/cash
    -> require cashier/collector
    -> post payment
    -> allocate
    -> create receipt
    -> audit log

Required fields:

{
  tenant_id,
  tenancy_id,
  property_id,
  unit_id,
  amount,
  collector_user_id,
  payment_date,
  billing_period,
  notes
}
Paystack flow
Tenant/Admin starts payment
    -> POST /payments/initialize/paystack
    -> API creates payment_intent
    -> API initializes Paystack transaction
    -> Paystack returns authorization_url, access_code, reference
    -> User pays on Paystack hosted checkout
    -> Paystack redirects to /api/paystack/callback
    -> Frontend/API calls POST /payments/verify/paystack
    -> Paystack webhook also arrives at /webhooks/paystack
    -> API verifies webhook signature
    -> API verifies transaction reference server-side
    -> API checks amount, currency, tenant, billing period, and reference
    -> Payment is posted exactly once
    -> Allocations are created
    -> Receipt is created
    -> Receipt PDF job is queued
    -> Notification job is queued
    -> Audit log is written

Use the webhook as the strongest source of truth, but still support verification from callback so the UI can update quickly. Paystack recommends webhooks over callbacks, requires a 200 OK response, retries failed webhook delivery, and provides x-paystack-signature HMAC verification.

Daraja STK Push flow
Tenant/Admin starts M-Pesa STK request
    -> POST /payments/initialize/daraja-stk
    -> API creates pending payment_intent
    -> API sends STK Push request to Safaricom
    -> Tenant receives M-Pesa PIN prompt
    -> Safaricom callback arrives
    -> POST /webhooks/daraja/stk-callback
    -> API matches CheckoutRequestID
    -> If success: post payment
    -> allocate payment
    -> create receipt
    -> enqueue receipt PDF
    -> notify tenant/admin
    -> audit log
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
Users, Roles, Permissions
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
Website CMS / Public Listing Control
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

1. Receive raw payload
2. Verify x-paystack-signature
3. Store raw event in webhook_events
4. Deduplicate by event_id/reference
5. Verify transaction server-side with Paystack
6. Validate amount, currency, tenant, billing period, and reference
7. Check if payment already posted
8. If not posted, post payment
9. Create allocations
10. Create receipt
11. Enqueue receipt PDF generation
12. Enqueue notification
13. Write audit log
14. Return 200 quickly
Daraja webhooks
POST /api/v1/webhooks/daraja/stk-callback
POST /api/v1/webhooks/daraja/result
POST /api/v1/webhooks/daraja/timeout
POST /api/v1/webhooks/daraja/c2b-validation
POST /api/v1/webhooks/daraja/c2b-confirmation

Responsibilities:

1. Receive callback
2. Store raw payload
3. Match provider reference to payment_intent
4. Mark intent successful, failed, or timed out
5. If successful, post payment
6. Allocate payment
7. Generate receipt
8. Notify tenant/admin
9. Write audit log
Webhook event schema
webhook_event = {
  _id,
  provider: "paystack" | "daraja" | "internal",
  event_id,
  reference,
  provider_reference,
  payload,
  signature_status: "verified" | "failed" | "not_required",
  processed_status: "pending" | "processed" | "failed" | "ignored",
  retry_count,
  processed_at,
  error_details,
  created_at,
  updated_at
}
10. Core Collections
users
roles
permissions
landlords
properties
units
tenants
tenancies
inquiries
website_listings
charges
payments
payment_allocations
payment_intents
receipts
penalties
communication_exceptions
deposit_ledgers
utility_charges
repair_tickets
repair_expenses
landlord_statements
landlord_payouts
documents
notifications
audit_logs
settings
commission_rules
penalty_rules
payment_methods
webhook_events

Critical separation:

Charges are not payments.
Payments are not receipts.
Penalties are not rent.
Deposits are not rent.
Utilities are independent charges.
Repair expenses are not payouts.
Landlord payouts are not tenant payments.

That separation is what keeps the finance layer clean. Mixing everything into one glorious “transactions” collection is how developers end up whispering apologies to production at midnight.

11. Core Schema Fields
Property
property = {
  _id,
  property_code,
  name,
  slug,
  landlord_id,
  description,
  total_units,
  location: {
    country,
    county,
    town,
    area,
    estate,
    street,
    buildingName,
    landmark,
    postalAddress,
    latitude,
    longitude,
    googleMapUrl,
    directionsNote,
    publicAddressLabel
  },
  public_listing_enabled,
  featured,
  status: "active" | "inactive",
  notes,
  created_at,
  updated_at
}
Unit
unit = {
  _id,
  unit_code,
  unit_number,
  slug,
  property_id,
  landlord_id,
  rent_amount,
  deposit_amount,
  status:
    | "vacant"
    | "reserved"
    | "occupied"
    | "notice_given"
    | "under_maintenance"
    | "locked_due_to_default",
  public_listing_enabled,
  assigned_tenant_id,
  current_tenancy_id,
  location_detail: {
    blockName,
    floor,
    wing,
    doorNumber,
    unitLabel,
    accessNote,
    visibleOnWebsite
  },
  water_billing_method,
  electricity_billing_method,
  notes,
  created_at,
  updated_at
}
Tenant
tenant = {
  _id,
  full_name,
  phone,
  alternative_phone,
  email,
  national_id,
  emergency_contact_name,
  emergency_contact_phone,
  status: "active" | "inactive" | "moved_out",
  created_at,
  updated_at
}
Tenancy
tenancy = {
  _id,
  tenant_id,
  property_id,
  unit_id,
  landlord_id,
  move_in_date,
  tenancy_start_date,
  rent_amount,
  deposit_amount,
  deposit_status,
  billing_cycle_day: 5,
  property_location_snapshot: {
    propertyName,
    county,
    town,
    area,
    buildingName,
    unitLabel
  },
  notice_status,
  status: "active" | "notice_given" | "moved_out" | "terminated",
  created_at,
  updated_at
}
Charge
charge = {
  _id,
  tenant_id,
  tenancy_id,
  property_id,
  unit_id,
  charge_type:
    | "rent"
    | "utility"
    | "penalty"
    | "deposit"
    | "repair"
    | "custom",
  billing_period,
  amount,
  amount_paid,
  balance,
  status: "unpaid" | "partial" | "paid" | "void",
  due_date,
  description,
  created_by,
  voided_by,
  void_reason,
  created_at,
  updated_at
}
Payment
payment = {
  _id,
  payment_reference,
  tenant_id,
  tenancy_id,
  property_id,
  unit_id,
  amount,
  method:
    | "mpesa_manual"
    | "kcb_manual"
    | "cash"
    | "paystack"
    | "daraja_stk"
    | "adjustment",
  payment_date,
  billing_period,
  source_channel,
  provider_reference,
  recorded_by,
  proof_document_id,
  status: "pending" | "posted" | "reversed" | "failed",
  notes,
  created_at,
  updated_at
}
Payment Intent
payment_intent = {
  _id,
  intent_reference,
  tenant_id,
  tenancy_id,
  property_id,
  unit_id,
  provider: "paystack" | "daraja",
  amount,
  currency: "KES",
  provider_reference,
  checkout_request_id,
  authorization_url,
  access_code,
  status: "pending" | "successful" | "failed" | "expired" | "posted",
  metadata,
  expires_at,
  created_at,
  updated_at
}
Receipt
receipt = {
  _id,
  receipt_number,
  payment_id,
  tenant_id,
  property_id,
  unit_id,
  amount_paid,
  balance_after_payment,
  payment_method,
  payment_reference,
  pdf_document_id,
  issued_by,
  issued_at,
  created_at
}
Penalty
penalty = {
  _id,
  tenant_id,
  tenancy_id,
  charge_id,
  billing_period,
  days_late,
  penalty_band,
  amount,
  status: "applied" | "waived" | "reversed",
  waived_by,
  waiver_reason,
  communication_exception_id,
  created_at,
  updated_at
}
Repair Ticket
repair_ticket = {
  _id,
  ticket_number,
  tenant_id,
  property_id,
  unit_id,
  landlord_id,
  reported_by,
  issue_category,
  description,
  priority: "low" | "medium" | "high" | "urgent",
  responsible_party: "landlord" | "glamandi",
  technician_type: "landlord_technician" | "glamandi_technician",
  status:
    | "open"
    | "in_progress"
    | "awaiting_approval"
    | "completed"
    | "billed"
    | "deducted"
    | "closed",
  created_at,
  updated_at
}
Landlord Statement
landlord_statement = {
  _id,
  landlord_id,
  property_id,
  statement_period,
  gross_collected,
  repair_deductions,
  landlord_withdrawals,
  commission_amount,
  net_payout,
  status: "draft" | "generated" | "approved" | "paid",
  pdf_document_id,
  generated_by,
  generated_at,
  created_at,
  updated_at
}
12. Business Rules
Rent
Rent is due on or before the 5th of every month.
Move-in billing
Move-in from 1st to 15th:
    full rent + full deposit

Move-in after 15th:
    half rent + full deposit

Next month onward:
    full rent due by 5th
Penalties
6 to 10 days late:
    KES 500

11 to 15 days late:
    KES 700

16 to 30 days late:
    KES 1,000

Whole month default:
    KES 1,400
Penalty exceptions
Admin can waive penalty.
Admin can impose manual penalty.
Admin must enter waiver/imposition reason.
Early communication exception must be logged.
No communication = high-risk default.
Deposit
Deposit is not rent.
Tenant cannot consume deposit.
Refund requires valid notice.
Notice must be given one month earlier, between 1st and 5th.
Delayed notice requires manual review.
Final exit review can deduct damages or unpaid balances.
Commission
Default Glamandi commission:
    10% of total money collected from a property

Store in:
    commission_rules

Never bury it in code.
Landlord payout
Net Landlord Payout =
    collected rent
    - Glamandi commission
    - approved repair deductions
    - landlord withdrawals / advances
Payment allocation priority
1. Oldest outstanding rent
2. Penalties
3. Utilities
4. Current month rent
5. Deposit if due
6. Future credit / advance
Finance rules
Never hard delete finance records.
Reverse instead of deleting.
Every reversal requires reason.
Every payment produces allocations.
Every payment produces receipt.
Every waiver requires reason.
Every setting change is audited.
13. BullMQ Queue Design
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

Scheduled jobs:

Monthly rent charge generation
    runs on 1st of every month

Daily overdue scan
    runs daily from 6th onward

Daily penalty evaluation
    applies correct penalty band

Monthly landlord statement generation
    runs after billing cycle close

Daily website availability sync
    syncs vacant/reserved/occupied units to website

Inquiry follow-up reminders
    flags leads not contacted

Repair reminder scan
    flags unresolved repairs

Payment reconciliation
    checks pending Paystack/Daraja references

Processor responsibilities:

rent-generation.processor.ts
    creates monthly rent charges

penalty-evaluation.processor.ts
    evaluates late rent and applies penalty rules

statement-generation.processor.ts
    creates landlord and tenant statements

receipt-generation.processor.ts
    generates receipt PDFs

notification.processor.ts
    sends email/SMS/WhatsApp notifications

website-sync.processor.ts
    syncs public property/unit availability

inquiry-followup.processor.ts
    creates reminders for stale inquiries

repair-reminder.processor.ts
    flags repairs beyond SLA

export-generation.processor.ts
    generates CSV/PDF/Excel reports

payment-reconciliation.processor.ts
    rechecks pending payment intents
14. Required Imports by Responsibility
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
import { QueueModule } from './queue/queue.module';
payments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Payment } from '../../database/schemas/payment.schema';
import { Charge } from '../../database/schemas/charge.schema';
import { PaymentIntent } from '../../database/schemas/payment-intent.schema';

import { PaymentAllocationService } from './allocators/payment-allocation.service';
import { PaymentPostingService } from './payment-posting.service';
import { ReceiptsService } from '../receipts/receipts.service';
import { AuditService } from '../audit/audit.service';

import { EnqueueReceiptGenerationJob } from '../../queue/jobs/enqueue-receipt-generation.job';
import { EnqueueNotificationJob } from '../../queue/jobs/enqueue-notification.job';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { ManualMpesaPaymentDto } from './dto/manual-mpesa-payment.dto';
import { ManualKcbPaymentDto } from './dto/manual-kcb-payment.dto';
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
apps/worker/src/main.ts
import { bootstrapWorkers } from './bootstrap/register-workers';
import { registerSchedulers } from './bootstrap/register-schedulers';
import { createWorkerLogger } from './common/logger';
apps/worker/src/bootstrap/register-workers.ts
import { Worker } from 'bullmq';
import { QUEUE_NAMES } from '@glamandi/contracts/queue-names';
import { redisConnection } from '../queues/queue.factory';

import { RentGenerationProcessor } from '../processors/rent-generation.processor';
import { PenaltyEvaluationProcessor } from '../processors/penalty-evaluation.processor';
import { StatementGenerationProcessor } from '../processors/statement-generation.processor';
import { ReceiptGenerationProcessor } from '../processors/receipt-generation.processor';
import { NotificationProcessor } from '../processors/notification.processor';
import { WebsiteSyncProcessor } from '../processors/website-sync.processor';
import { InquiryFollowupProcessor } from '../processors/inquiry-followup.processor';
import { RepairReminderProcessor } from '../processors/repair-reminder.processor';
import { PaymentReconciliationProcessor } from '../processors/payment-reconciliation.processor';
apps/web/lib/api-client/client.ts
import { API_ROUTES } from '@glamandi/contracts/routes';
import type { ApiResponse } from '@glamandi/types/api';
import { ApiClientError } from './errors';
apps/web/lib/auth/permissions.ts
import { PERMISSIONS } from '@glamandi/contracts/permissions';
import type { UserSession } from '@glamandi/types/auth';
15. Contracts Package
packages/contracts/src/
├── routes.ts
├── permissions.ts
├── queue-names.ts
├── webhook-events.ts
├── payment-status.ts
├── payment-methods.ts
├── charge-status.ts
├── charge-types.ts
├── unit-status.ts
├── tenancy-status.ts
├── inquiry-status.ts
├── repair-status.ts
├── payout-status.ts
├── penalty-types.ts
├── document-types.ts
├── roles.ts
└── index.ts
Queue names
export const QUEUE_NAMES = {
  RENT_GENERATION: 'rent-generation',
  PENALTY_EVALUATION: 'penalty-evaluation',
  STATEMENT_GENERATION: 'statement-generation',
  RECEIPT_GENERATION: 'receipt-generation',
  NOTIFICATION_DISPATCH: 'notification-dispatch',
  WEBSITE_SYNC: 'website-sync',
  INQUIRY_FOLLOWUP: 'inquiry-followup',
  REPAIR_REMINDERS: 'repair-reminders',
  REPORT_EXPORT: 'report-export',
  PAYMENT_RECONCILIATION: 'payment-reconciliation',
} as const;
Payment methods
export const PAYMENT_METHODS = {
  MPESA_MANUAL: 'mpesa_manual',
  KCB_MANUAL: 'kcb_manual',
  CASH: 'cash',
  PAYSTACK: 'paystack',
  DARAJA_STK: 'daraja_stk',
  ADJUSTMENT: 'adjustment',
} as const;
16. Permission Matrix
Admin
Full system access
Manage users and roles
Manage properties, units, tenants, landlords
Create and reverse payments
Waive and apply penalties
Approve repair deductions
Generate statements
Mark payouts paid
Manage website listings
View audit logs
Change business settings and rules
Staff
View dashboard
Manage tenants
Manage units
Record manual M-Pesa payments
Record manual KCB payments
Record cash payments
Generate receipts
Log repairs
Update inquiries
View operational reports

Cannot:
    change commission rules
    change penalty rules
    reverse finance records without approval
    create admin users
    delete financial records
Tenant
View own unit
View own charges
View own payments
Download own receipts
View own penalties
View own deposit status
View own utilities
Submit repair requests
View notices
Update own profile basics
Landlord
View owned properties
View owned units
View occupancy status
View repair deductions
Download monthly statements
View payout history
View documents
17. Website Integration Rules
Only public_listing_enabled properties appear online.
Only units with status vacant or reserved appear online.
Occupied units should not appear as available.
Admin controls public visibility.
Public inquiries become CRM inquiries.
Unit inquiry stores interested property_id and unit_id.
When unit status changes, website-sync queue runs.
Website listings are generated from property + unit data.

Public website pages:

/
    Brand promise, featured properties, CTA

/about
    Trust, company story, credibility

/services
    Property management services

/properties
    Searchable listings

/properties/[propertySlug]
    Property details, location, available units

/units/[unitSlug]
    Unit detail, rent, location label, inquiry form

/contact
    Contact form, map, WhatsApp CTA

/login
    Entry point for admin, tenant, landlord
18. Environment Variables
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

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
19. Docker Services
web
api
worker
redis
mongo1
mongo2
mongo3
nginx

Required infra files:

infra/docker/docker-compose.dev.yml
infra/docker/docker-compose.prod.yml
infra/docker/mongo/mongod.conf
infra/docker/mongo/rs-init.js
infra/docker/redis/redis.conf
infra/docker/nginx/nginx.conf
infra/docker/api/Dockerfile
infra/docker/web/Dockerfile
infra/docker/worker/Dockerfile
20. Internal Build Order

This is not client phasing. She paid for the full system. This is the engineering order so Frank does not build a beautiful disaster.

1. Monorepo setup
2. Shared contracts, types, utils
3. Docker local infra
4. Mongo replica set setup
5. Auth, users, roles, permissions
6. Properties with location model
7. Units with location detail model
8. Landlords
9. Tenants
10. Tenancies
11. Charges
12. Move-in billing rules
13. Deposits
14. Manual M-Pesa payments
15. Manual KCB payments
16. Cash payments
17. Payment allocation engine
18. Receipts
19. Paystack integration
20. Paystack webhook
21. Daraja STK structure
22. Daraja webhooks
23. Penalty engine
24. Communication exceptions
25. Utilities
26. Repairs
27. Repair deductions
28. Landlord statements
29. Landlord payouts
30. Reports
31. Tenant portal
32. Landlord portal
33. Admin dashboard
34. Public website
35. Website listing sync
36. Inquiries CRM
37. Notifications
38. BullMQ schedulers
39. Audit logs
40. Exporting and PDFs
41. Documentation and SOPs
42. Testing
43. Deployment
44. Training
45. Monthly support plan
21. Documentation That Makes Frank Hard to Replace
docs/product/business-rules.md
docs/product/screen-map.md
docs/product/permissions-matrix.md
docs/product/reporting-spec.md
docs/product/tenant-portal-guide.md
docs/product/landlord-portal-guide.md

docs/operations/admin-sop.md
docs/operations/staff-sop.md
docs/operations/payout-sop.md
docs/operations/reconciliation-sop.md
docs/operations/backup-recovery-sop.md
docs/operations/incident-response-sop.md

docs/architecture/system-overview.md
docs/architecture/module-map.md
docs/architecture/data-model.md
docs/architecture/payment-flows.md
docs/architecture/webhook-flows.md
docs/architecture/queue-flows.md
docs/architecture/deployment-architecture.md

docs/technical/coding-standards.md
docs/technical/database-indexes.md
docs/technical/audit-policy.md
docs/technical/finance-ledger-policy.md
docs/technical/webhook-idempotency.md

This documentation is not decoration. It is part of the product. Code can be replaced. Code plus rules, SOPs, reports, training, and operating doctrine becomes infrastructure.

22. Long-Term Partner Positioning

Frank should not position himself as “the developer.” That is the shallow end of the pool, and people drown there too, tragically.

Position him as:

Technology and operations partner for Glamandi’s property management growth.

Monthly support package should include:

Hosting management
Database backups
Security updates
Bug fixes
Payment reconciliation support
System monitoring
Staff training
New report requests
Monthly business review
Website SEO improvements
M-Pesa Daraja upgrade
WhatsApp reminder upgrade
Feature enhancements

Final positioning statement to Sofia:

Glamandi will not only have a website. You will have a complete property management operating system where your website, tenants, landlords, rent collection, receipts, penalties, repairs, deductions, statements, payouts, and reports all work from one source of truth. This gives you control, traceability, and room to scale without depending on scattered notebooks, WhatsApp messages, and manual calculations.
