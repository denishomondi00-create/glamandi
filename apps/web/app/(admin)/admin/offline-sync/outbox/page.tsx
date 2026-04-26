import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Offline Outbox | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Offline Sync",
  "title": "Offline Outbox",
  "description": "Review local-to-server mutation queue waiting to sync or requiring retry.",
  "apiRoute": "/api/v1/sync/push",
  "primaryAction": {
    "href": "/admin/offline-sync/conflicts",
    "label": "Review Conflicts"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Outbox",
      "value": "Safe drafts",
      "helper": "Pending mutations only"
    },
    {
      "label": "Conflicts",
      "value": "Manual",
      "helper": "Finance conflicts need admin"
    },
    {
      "label": "Source",
      "value": "MongoDB",
      "helper": "IndexedDB is temporary"
    }
  ],
  "panels": [
    {
      "title": "Offline Sync workflow",
      "description": "Use this page to manage offline outbox while keeping the Control Center tied to the API and audit trail.",
      "items": [
        "Server-backed data",
        "Role-based access",
        "Clean activity history"
      ]
    },
    {
      "title": "Source of truth",
      "description": "Canonical business data belongs in MongoDB. Local cache is for field continuity, not creative accounting.",
      "items": [
        "MongoDB canonical",
        "IndexedDB temporary",
        "Audit logs for sensitive edits"
      ]
    },
    {
      "title": "Conflict policy",
      "description": "Financial conflicts are server-wins by default and require admin reconciliation before final posting.",
      "items": [
        "Duplicate reference block",
        "Closed tenancy conflict",
        "Manual resolution"
      ]
    }
  ],
  "table": {
    "title": "Offline Outbox queue",
    "description": "Offline and sync records needing monitoring or resolution.",
    "columns": [
      "Local ID",
      "Operation",
      "Device",
      "Status"
    ],
    "rows": [
      [
        "local-001",
        "CREATE_MANUAL_MPESA_PAYMENT",
        "Staff tablet",
        "pending"
      ],
      [
        "local-002",
        "CREATE_REPAIR_TICKET",
        "Office laptop",
        "synced"
      ],
      [
        "local-003",
        "CREATE_INQUIRY",
        "Reception device",
        "conflict"
      ]
    ]
  },
  "offlineNote": "This module can show cached records and may allow safe draft creation. Official finance posting, receipt numbers, payouts, and verified payments must wait for online server confirmation.",
  "dangerNote": "Restricted action. Use role permissions and audit logs before changing rules, payouts, reversals, or conflict resolutions."
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
