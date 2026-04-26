# Glamandi Worker, Packages, Infrastructure, Docs, and Root Delivery

This delivery completes the requested layer for the Glamandi Property Management Operating System:

- `apps/worker/` BullMQ workers, schedulers, services, queues, and utilities.
- `packages/types/` shared TypeScript business types.
- `packages/contracts/` shared routes, permissions, queue names, statuses, and constants.
- `packages/sync/` offline mutation envelopes, conflict types, sync operations, and merge policies.
- `packages/ui/`, `packages/utils/`, and `packages/config/` shared UI tokens, formatting helpers, environment helpers, and Glamandi brand configuration.
- `infra/` Docker, MongoDB replica set config, Redis, Nginx, scripts, monitoring, backups, and SSL placeholders.
- `docs/` architecture, API, operations, product, and technical documentation.
- `.github/workflows/` CI, deploy, backup checks, and security scan workflows.
- Root workspace files for pnpm, Turborepo, TypeScript, linting, formatting, environment configuration, and README.

The brand system is based on the Glamandi Homes logo palette:

- Bright cyan: `#17DEFE`
- Sky blue: `#3AC4FA`
- Soft aqua: `#32D2F7`
- Light icy blue: `#C5F0F8`
- Dark teal: `#145F6B`
- Near black: `#181918`
- Background: `#F0F0F0` to `#FFFFFF`

Core rule preserved: MongoDB remains the source of truth. IndexedDB is only a temporary offline working copy.
