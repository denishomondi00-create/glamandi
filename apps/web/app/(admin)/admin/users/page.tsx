import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Users | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Users" title="Users"
      description="Staff, admin, and system user accounts — roles, permissions, and activity status."
      apiPath="/users"
      columns={[
        { key: "name", header: "Name" },
        { key: "email", header: "Email" },
        { key: "role", header: "Role" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Created" },
      ]}
      rowHref={(row) => `/admin/users/${String(row._id)}`}
      primaryAction={{ href: "/admin/users/new", label: "New User" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
