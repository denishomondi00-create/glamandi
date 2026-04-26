# Offline Sync Flow

The PWA pulls safe data with `/sync/bootstrap` and `/sync/pull`. Offline actions are stored as mutation envelopes in IndexedDB. When connection returns, the client pushes to `/sync/push`. The server accepts, rejects, or creates conflicts.

Financial records default to server truth and manual admin resolution. Tenant notes can merge. Repairs merge only if unit and tenancy remain valid. Settings cannot be edited offline.
