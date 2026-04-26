# Glamandi apps/web Generation Notes

This package was generated from the Glamandi PMOS product definition, offline-first operating model, portal map, payment rules, and logo-derived colour palette.

## Theme tokens

- Bright cyan: `#17DEFE`
- Sky blue: `#3AC4FA`
- Soft aqua: `#32D2F7`
- Light icy blue: `#C5F0F8`
- Dark teal: `#145F6B`
- Near black: `#181918`
- White/light: `#F0F0F0` to `#FFFFFF`

## Architectural guardrails reflected in the code

- MongoDB remains the server-side source of truth.
- IndexedDB is treated as a temporary offline working copy.
- Payment posting, official receipt generation, Paystack verification, Daraja STK callbacks, payout marking, and final audit commits remain online/server-only concerns.
- Manual M-Pesa, KCB, cash, repairs, inquiries, tenant notes, communication exceptions, utility drafts, and penalty waiver requests can be queued offline.
- Tenant and landlord portals are role-scoped by layout and navigation.
