import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Commission Rules | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Settings",
  "title": "Commission Rules",
  "description": "Configure Glamandi commission rules, calculation basis, and effective dates.",
  "apiRoute": "/api/v1/settings/commission-rules",
  "primaryAction": {
    "href": "/admin/settings/commission-rules",
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
      "description": "Use this page to manage commission rules while keeping the Control Center tied to the API and audit trail.",
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
    "title": "Commission Rules list",
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
  "formTitle": "Commission Rules form",
  "formFields": [
    {
      "label": "Name / Reference",
      "placeholder": "Enter commission rules reference"
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
  "dangerNote": "Restricted action. Use role permissions and audit logs before changing rules, payouts, reversals, or conflict resolutions."
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
