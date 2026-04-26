import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "New Unit | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Units",
  "title": "New Unit",
  "description": "Create a unit under a property with rent, deposit rule, block, floor, door number, and website visibility.",
  "apiRoute": "/api/v1/units",
  "primaryAction": {
    "href": "/admin/units/new",
    "label": "Save Draft"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Units",
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
      "title": "Units workflow",
      "description": "Use this page to manage new unit while keeping the Control Center tied to the API and audit trail.",
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
    "title": "New Unit list",
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
  "formTitle": "New Unit form",
  "formFields": [
    {
      "label": "Name / Reference",
      "placeholder": "Enter new unit reference"
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
  ]
};

        export default function Page() {
          return <AdminResourcePage {...page} />;
        }
