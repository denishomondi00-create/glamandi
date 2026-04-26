# Data Model

Primary entities are landlord, property, unit, tenant, tenancy, charge, payment, payment allocation, receipt, penalty, deposit ledger entry, utility charge, repair ticket, repair expense, landlord statement, payout, inquiry, document, notification, audit log, setting, offline client, sync batch, sync conflict, and webhook event.

Property location is stored on the property. Unit access details are stored on the unit. A tenancy stores a location snapshot so receipts and statements remain historically accurate even if a property or unit label changes later.
