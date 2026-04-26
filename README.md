# Glamandi Property Management Operating System

Glamandi PMOS is a full operating system for Glamandi Homes: public property website, admin/staff control center, tenant portal, landlord portal, offline operations layer, API, background workers, shared contracts, infrastructure, and operational documentation.

## Product faces

1. **Public Website** — property listings, available units, inquiries, contact forms, SEO pages, and login entry.
2. **Admin / Staff Control Center** — properties, units, tenants, landlords, charges, payments, receipts, penalties, deposits, utilities, repairs, statements, payouts, reports, audit logs, and website controls.
3. **Tenant Portal** — balances, receipts, penalties, utilities, deposit status, notices, repair requests, and payment options.
4. **Landlord Portal** — owned properties, occupancy, statements, deductions, payout history, documents, and repair visibility.
5. **Offline Operations Layer** — cached safe operational data, offline payment drafts, repair logs, inquiries, notes, sync queue, and conflict resolution.

## Architecture principle

MongoDB is the source of truth. IndexedDB is only a temporary offline working copy. Offline records may be drafted locally, but finance posting, official receipt numbering, payment verification, webhooks, landlord statements, payouts, and final audit commits must happen server-side.

## Brand system

The UI theme follows the Glamandi Homes logo palette:

- Bright cyan: `#17DEFE`
- Sky blue: `#3AC4FA`
- Soft aqua: `#32D2F7`
- Light icy blue: `#C5F0F8`
- Dark teal: `#145F6B`
- Near black: `#181918`
- Background: `#F0F0F0` to `#FFFFFF`

## Local startup

```bash
pnpm install
pnpm infra:dev
pnpm dev
```

Services:

- Web: `http://localhost:3000`
- API: `http://localhost:4000/api/v1`
- MongoDB replica set: `mongo1,mongo2,mongo3`
- Redis: `localhost:6379`

## Build order

Start with shared contracts and infrastructure, then API foundation, property/unit models, tenants/tenancies, finance, offline sync, payment integrations, portals, reporting, workers, audit, documentation, deployment, and staff training.

## Operational promise

Glamandi will not only have a website. It will have one connected source of truth where the website, tenants, landlords, rent collection, receipts, penalties, repairs, deductions, statements, payouts, and reports work together, including poor-internet operating moments.
