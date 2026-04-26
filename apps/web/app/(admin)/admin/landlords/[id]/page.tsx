import type { Metadata } from "next";
import { AdminDetailPage } from "@/components/glamandi/admin-detail-page";
export const metadata: Metadata = { title: "Landlord | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminDetailPage
      eyebrow="Admin / Landlords"
      title="Landlord Profile"
      apiPath={`/landlords/${id}`}
      fields={[
        { key: "firstName", label: "First Name" }, { key: "lastName", label: "Last Name" },
        { key: "phone", label: "Phone" }, { key: "email", label: "Email" },
        { key: "idNumber", label: "ID Number" }, { key: "status", label: "Status" },
        { key: "notes", label: "Notes" }, { key: "created_at", label: "Joined" },
      ]}
      tabs={[
        { label: "Profile", href: `/admin/landlords/${id}` },
        { label: "Properties", href: `/admin/landlords/${id}/properties` },
        { label: "Statements", href: `/admin/landlords/${id}/statements` },
        { label: "Payouts", href: `/admin/landlords/${id}/payouts` },
        { label: "Deductions", href: `/admin/landlords/${id}/deductions` },
        { label: "Repairs", href: `/admin/landlords/${id}/repairs` },
      ]}
      primaryAction={{ href: `/admin/landlords/${id}`, label: "Edit" }}
      secondaryAction={{ href: "/admin/landlords", label: "All Landlords" }}
    />
  );
}
