# Glamandi Apps/Web Generated Layer

Generated on 2026-04-25T08:44:59.670224Z.

This package overlays the uploaded Glamandi routes with the requested tenant portal, landlord portal, app API routes, shared components, feature folders, offline IndexedDB layer, service worker helpers, utilities, metadata helpers, hooks, store, public assets, and web app configuration.

## Architecture rules implemented

- MongoDB remains the source of truth through the backend API.
- IndexedDB is treated as a temporary offline working copy.
- Tenant and landlord route files import feature `server/*` loaders first, then render feature/components.
- Client mutations go through `lib/api-client/*` or `lib/offline/*`.
- URL logic lives in `lib/utils/urls.ts`.
- Permission logic lives in `lib/auth/permissions.ts`.
- Theme colors follow the extracted Glamandi logo palette: `#17DEFE`, `#3AC4FA`, `#32D2F7`, `#C5F0F8`, `#145F6B`, `#181918`.

## File count

573 files are present under `glamandi/apps/web`.
