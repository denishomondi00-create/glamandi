import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Repair Ticket | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Repairs"
      title="Repair Ticket"
      apiPath={`/repairs/${id}`}
      fields={[
        { key: "title", label: "Title" }, { key: "description", label: "Description" },
        { key: "status", label: "Status" }, { key: "priority", label: "Priority" },
        { key: "dueDate", label: "Due Date" }, { key: "created_at", label: "Raised" },
      ]}
      primaryAction={{ href: `/admin/repairs/${id}`, label: "Update Status" }}
      secondaryAction={{ href: "/admin/repairs", label: "All Repairs" }}
    />
  );
}
