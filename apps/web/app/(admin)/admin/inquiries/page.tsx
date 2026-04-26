import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Inquiries | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Inquiries" title="Inquiries"
      description="Website inquiry leads — prospect details, unit interest, status, follow-up notes, and conversion tracking."
      apiPath="/inquiries"
      columns={[
        { key: "name", header: "Name" },
        { key: "phone", header: "Phone" },
        { key: "email", header: "Email" },
        { key: "message", header: "Message" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Date" },
      ]}
      rowHref={(row) => `/admin/inquiries/${String(row._id)}`}
      primaryAction={{ href: "/admin/inquiries", label: "Inquiries" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
