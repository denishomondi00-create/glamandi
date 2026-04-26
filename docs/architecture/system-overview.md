# System Overview

Glamandi PMOS connects the public website, admin/staff control center, tenant portal, landlord portal, offline PWA, API, workers, MongoDB, Redis, and payment providers into one operating system.

## Main flow

Public website and portals run in `apps/web`. Authenticated actions call the NestJS REST API in `apps/api`. MongoDB replica set stores canonical records. Redis and BullMQ run background workflows through `apps/worker`. The offline PWA caches safe data in IndexedDB and pushes mutations to `/sync/push` when online.

## Source of truth

MongoDB is the source of truth. IndexedDB is temporary. Financial posting, official receipt numbering, Paystack verification, Daraja callbacks, landlord statements, payouts, and audit commits must be completed server-side.
