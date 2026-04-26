import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Repairs | Landlord | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminListPage
      eyebrow="Admin / Landlords / Repairs" title="Repairs"
      description="Repairs linked to this landlord account."
      apiPath="/repairs?landlordId=${id}"
      columns={[
        { key: "status", header: "Status" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "created_at", header: "Date" },
      ]}
      secondaryAction={{ href: `/admin/landlords/${id}`, label: "Back to Profile" }}
    />
  );
}
