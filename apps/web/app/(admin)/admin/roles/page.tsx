import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Roles | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Roles" title="Roles & Permissions"
      description="Custom role definitions, permission sets, and user group assignments for RBAC."
      apiPath="/roles"
      columns={[
        { key: "name", header: "Role Name" },
        { key: "description", header: "Description" },
        { key: "status", header: "Status" },
        { key: "created_at", header: "Created" },
      ]}
      rowHref={() => `/admin/roles`}
      primaryAction={{ href: "/admin/roles", label: "Manage Roles" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
