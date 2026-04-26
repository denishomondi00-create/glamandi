import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "New Payment | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Payments",
  "title": "New Payment",
  "description": "Choose payment channel and record or initialize a payment through supported methods.",
  "apiRoute": "/api/v1/payments",
  "primaryAction": {
    "href": "/admin/payments/new",
    "label": "Save Draft"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Payments",
      "value": "Ready",
      "helper": "API-connected scaffold"
    },
    {
      "label": "Status",
      "value": "Active",
      "helper": "Prepared for live data"
    },
    {
      "label": "Audit",
      "value": "On",
      "helper": "Sensitive changes logged"
    }
  ],
  "panels": [
    {
      "title": "Payments workflow",
      "description": "Use this page to manage new payment while keeping the Control Center tied to the API and audit trail.",
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
    "title": "New Payment list",
    "description": "Connect this table to the corresponding API endpoint with pagination and search.",
    "columns": [
      "Name",
      "Property/Owner",
      "Status",
      "Updated"
    ],
    "rows": [
      [
        "Sample item",
        "Glamandi Homes",
        "Active",
        "Today"
      ],
      [
        "Review needed",
        "Mtwapa",
        "Pending",
        "Yesterday"
      ],
      [
        "Archived record",
        "System",
        "Closed",
        "This month"
      ]
    ]
  },
  "formTitle": "New Payment form",
  "formFields": [
    {
      "label": "Name / Reference",
      "placeholder": "Enter new payment reference"
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
