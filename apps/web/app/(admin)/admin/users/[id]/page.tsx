import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "User | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Users"
      title="User Profile"
      apiPath={`/users/${id}`}
      fields={[
        { key: "name", label: "Name" }, { key: "email", label: "Email" },
        { key: "phone", label: "Phone" }, { key: "role", label: "Role" },
        { key: "status", label: "Status" }, { key: "created_at", label: "Created" },
      ]}
      primaryAction={{ href: `/admin/users/${id}`, label: "Edit" }}
      secondaryAction={{ href: "/admin/users", label: "All Users" }}
    />
  );
}
