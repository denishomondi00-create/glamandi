import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Deposits | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Deposits",
  "title": "Deposits",
  "description": "Track deposit ledger, refunds, adjustments, exit deductions, and review queues.",
  "apiRoute": "/api/v1/deposits",
  "primaryAction": {
    "href": "/admin",
    "label": "Back to Dashboard"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Posting",
      "value": "Server",
      "helper": "Official finance actions require API truth"
    },
    {
      "label": "Receipt",
      "value": "Queued",
      "helper": "PDF generation after posting"
    },
    {
      "label": "Audit",
      "value": "Required",
      "helper": "Every sensitive action logged"
    }
  ],
  "panels": [
    {
      "title": "Deposits workflow",
      "description": "Use this page to manage deposits while keeping the Control Center tied to the API and audit trail.",
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
      "title": "Finance discipline",
      "description": "Posted payments are never hard deleted. Reversals require reasons, allocations, receipt handling, and audit records.",
      "items": [
        "Allocate to charges",
        "Create receipt",
        "Queue PDF"
      ]
    }
  ],
  "table": {
    "title": "Deposits records",
    "description": "Finance rows should be loaded from the API with allocation and audit context.",
    "columns": [
      "Reference",
      "Tenant/Landlord",
      "Amount",
      "Status"
    ],
    "rows": [
      [
        "PMT-0001",
        "Sample tenant",
        "KES 18,000",
        "Posted"
      ],
      [
        "DRAFT-004",
        "Awaiting sync",
        "KES 9,500",
        "Draft"
      ],
      [
        "REV-002",
        "Admin review",
        "KES 2,000",
        "Reversed"
      ]
    ]
  },
  "offlineNote": "This module can show cached records and may allow safe draft creation. Official finance posting, receipt numbers, payouts, and verified payments must wait for online server confirmation.",
  "financeNote": "Every payment must allocate to charges, generate a receipt after server posting, and write an audit log. Reversal beats deletion, because deleting money records is how chaos wears a tie.",
  "dangerNote": "Restricted action. Use role permissions and audit logs before changing rules, payouts, reversals, or conflict resolutions."
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
