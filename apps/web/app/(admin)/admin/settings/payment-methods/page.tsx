import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Payment Methods | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Settings",
  "title": "Payment Methods",
  "description": "Activate manual M-Pesa, KCB, cash, Paystack, Daraja STK, and future C2B settings.",
  "apiRoute": "/api/v1/settings/payment-methods",
  "primaryAction": {
    "href": "/admin/settings/payment-methods",
    "label": "Save Draft"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Rules",
      "value": "Editable",
      "helper": "Never hardcode business rules"
    },
    {
      "label": "Permissions",
      "value": "Admin",
      "helper": "Restricted changes"
    },
    {
      "label": "Audit",
      "value": "On",
      "helper": "Track rule changes"
    }
  ],
  "panels": [
    {
      "title": "Settings workflow",
      "description": "Use this page to manage payment methods while keeping the Control Center tied to the API and audit trail.",
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
    "title": "Payment Methods list",
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
  "formTitle": "Payment Methods form",
  "formFields": [
    {
      "label": "Name / Reference",
      "placeholder": "Enter payment methods reference"
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
  "offlineNote": "This module can show cached records and may allow safe draft creation. Official finance posting, receipt numbers, payouts, and verified payments must wait for online server confirmation.",
  "dangerNote": "Restricted action. Use role permissions and audit logs before changing rules, payouts, reversals, or conflict resolutions."
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
