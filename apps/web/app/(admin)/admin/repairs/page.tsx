import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Repairs | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Repairs" title="Repair Tickets"
      description="Tenant repair requests, maintenance tickets, assignment, priority, and completion status."
      apiPath="/repairs"
      columns={[
        { key: "title", header: "Title" },
        { key: "status", header: "Status" },
        { key: "priority", header: "Priority" },
        { key: "dueDate", header: "Due Date" },
        { key: "created_at", header: "Raised" },
      ]}
      rowHref={(row) => `/admin/repairs/${String(row._id)}`}
      primaryAction={{ href: "/admin/repairs/new", label: "New Ticket" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
