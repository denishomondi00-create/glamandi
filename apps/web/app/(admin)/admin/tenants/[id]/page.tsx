import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Tenant Profile | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Tenants"
      title="Tenant Profile"
      apiPath={`/tenants/${id}`}
      fields={[
        { key: "firstName", label: "First Name" }, { key: "lastName", label: "Last Name" },
        { key: "phone", label: "Phone" }, { key: "email", label: "Email" },
        { key: "idNumber", label: "ID Number" }, { key: "status", label: "Status" },
        { key: "created_at", label: "Joined" }, { key: "updated_at", label: "Last Updated" },
      ]}
      tabs={[
        { label: "Profile", href: `/admin/tenants/${id}` },
        { label: "Charges", href: `/admin/tenants/${id}/charges` },
        { label: "Payments", href: `/admin/tenants/${id}/payments` },
        { label: "Receipts", href: `/admin/tenants/${id}/receipts` },
        { label: "Penalties", href: `/admin/tenants/${id}/penalties` },
        { label: "Deposit", href: `/admin/tenants/${id}/deposit` },
        { label: "Tenancy", href: `/admin/tenants/${id}/tenancy` },
        { label: "Repairs", href: `/admin/tenants/${id}/repairs` },
        { label: "Utilities", href: `/admin/tenants/${id}/utilities` },
        { label: "Statement", href: `/admin/tenants/${id}/statement` },
      ]}
      primaryAction={{ href: `/admin/tenants/${id}`, label: "Edit" }}
      secondaryAction={{ href: "/admin/tenants", label: "All Tenants" }}
    />
  );
}
