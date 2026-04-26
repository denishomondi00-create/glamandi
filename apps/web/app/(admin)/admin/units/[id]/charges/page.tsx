import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Unit Charges | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Units",
  "title": "Unit Charges",
  "description": "Review charges tied to this unit, including rent, utilities, penalties, and move-in charges.",
  "apiRoute": "/api/v1/units/:id/charges",
  "primaryAction": {
    "href": "/admin/units/[id]/charges/new",
    "label": "Create New"
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
      "description": "Use this page to manage unit charges while keeping the Control Center tied to the API and audit trail.",
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
    "title": "Unit Charges list",
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
  }
};

        export default function Page({ params }: { params: { id: string } }) {
          return <AdminResourcePage {...page} recordId={params.id} />;
        }
