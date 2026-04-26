import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Penalties Report | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Reports",
  "title": "Penalties Report",
  "description": "Monitor penalty triggers, waivers, manual penalties, and exception impact.",
  "apiRoute": "/api/v1/reports/penalties",
  "primaryAction": {
    "href": "/admin/reports",
    "label": "Export Report"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Export",
      "value": "CSV/PDF",
      "helper": "Queue-based generation"
    },
    {
      "label": "Filters",
      "value": "Ready",
      "helper": "Property, period, status"
    },
    {
      "label": "Review",
      "value": "Monthly",
      "helper": "Business performance"
    }
  ],
  "panels": [
    {
      "title": "Reports workflow",
      "description": "Use this page to manage penalties report while keeping the Control Center tied to the API and audit trail.",
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
    }
  ],
  "table": {
    "title": "Penalties Report summary",
    "description": "Report table ready for filters, exports, and queue-generated files.",
    "columns": [
      "Metric",
      "Current",
      "Previous",
      "Change"
    ],
    "rows": [
      [
        "Collections",
        "KES 0",
        "KES 0",
        "0%"
      ],
      [
        "Occupancy",
        "0%",
        "0%",
        "0%"
      ],
      [
        "Pending reviews",
        "0",
        "0",
        "0"
      ]
    ]
  }
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
