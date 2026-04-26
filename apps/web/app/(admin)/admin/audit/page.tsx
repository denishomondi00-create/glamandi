import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Audit Log | Glamandi Control Center" };
export default function Page() {
  return (
    <AdminListPage
      eyebrow="Admin / Audit" title="Audit Log"
      description="Immutable audit trail of all sensitive actions — payments, reversals, role changes, payout approvals, and settings edits."
      apiPath="/audit"
      columns={[
        { key: "action", header: "Action" },
        { key: "entity", header: "Entity" },
        { key: "entityId", header: "Entity ID" },
        { key: "actorId", header: "Actor" },
        { key: "created_at", header: "Timestamp" },
      ]}
      primaryAction={{ href: "/admin", label: "Dashboard" }}
      secondaryAction={{ href: "/admin", label: "Dashboard" }}
    />
  );
}
