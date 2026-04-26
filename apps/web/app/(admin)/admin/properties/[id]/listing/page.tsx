import type { Metadata } from "next";
        import { AdminResourcePage } from "@/components/glamandi/admin-resource-page";

        export const metadata: Metadata = { title: "Property Listing | Glamandi Control Center" };

        const page = {
  "eyebrow": "Admin / Properties",
  "title": "Property Listing",
  "description": "Control website publishing, featured status, SEO details, photos, and public listing content.",
  "apiRoute": "/api/v1/website/properties/:id/publish",
  "primaryAction": {
    "href": "/admin/properties/[id]/listing",
    "label": "Save Draft"
  },
  "secondaryAction": {
    "href": "/admin",
    "label": "Dashboard"
  },
  "stats": [
    {
      "label": "Properties",
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
      "title": "Properties workflow",
      "description": "Use this page to manage property listing while keeping the Control Center tied to the API and audit trail.",
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
    "title": "Property Listing list",
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
  "formTitle": "Property Listing form",
  "formFields": [
    {
      "label": "Name / Reference",
      "placeholder": "Enter property listing reference"
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

        export default function Page({ params }: { params: { id: string } }) {
          return <AdminResourcePage {...page} recordId={params.id} />;
        }
