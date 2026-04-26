import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Landlord Profile | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Landlords",
  "title": "Landlord Profile",
  "description": "View landlord ownership, contact details, portal status, payout summaries, documents, and repair deductions.",
  "apiRoute": "/api/v1/landlords/:id",
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
      "label": "Landlords",
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
      "title": "Landlords workflow",
      "description": "Use this page to manage landlord profile while keeping the Control Center tied to the API and audit trail.",
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
    "title": "Landlord Profile list",
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
