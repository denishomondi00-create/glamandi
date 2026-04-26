import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Payment Channels Report | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Reports",
  "title": "Payment Channels Report",
  "description": "Compare manual M-Pesa, KCB, cash, Paystack, Daraja STK, and future C2B performance.",
  "apiRoute": "/api/v1/reports/payment-channels",
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
      "description": "Use this page to manage payment channels report while keeping the Control Center tied to the API and audit trail.",
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
    "title": "Payment Channels Report summary",
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
  },
  "formTitle": "Payment Channels Report form",
  "formFields": [
    {
      "label": "Name / Reference",
      "placeholder": "Enter payment channels report reference"
    },
    {
      "label": "Status",
      "type": "select",
      "placeholder": "Active / Pending / Review"
    },
    {
      "label": "Notes",
      "type": "textarea",
      "placeholder": "Add operational notes"
    }
  ],
  "offlineNote": "This module can show cached records and may allow safe draft creation. Official finance posting, receipt numbers, payouts, and verified payments must wait for online server confirmation."
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
