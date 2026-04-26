import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Inquiry | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Inquiries"
      title="Inquiry Detail"
      apiPath={`/inquiries/${id}`}
      fields={[
        { key: "name", label: "Name" }, { key: "phone", label: "Phone" },
        { key: "email", label: "Email" }, { key: "message", label: "Message" },
        { key: "unitInterest", label: "Unit Interest" }, { key: "status", label: "Status" },
        { key: "notes", label: "Notes" }, { key: "created_at", label: "Received" },
      ]}
      primaryAction={{ href: `/admin/inquiries/${id}`, label: "Update Status" }}
      secondaryAction={{ href: "/admin/inquiries", label: "All Inquiries" }}
    />
  );
}
