import type { Metadata } from "next";
import { AdminListPage } from "@/components/glamandi/admin-list-page";
export const metadata: Metadata = { title: "Location | Unit | Glamandi Control Center" };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AdminListPage
      eyebrow="Admin / Units / Location" title="Location"
      description="Location for this unit."
      apiPath="/location?unitId=${id}"
      columns={[
        { key: "status", header: "Status" },
        { key: "amount", header: "Amount (KES)", format: (v) => Number(v).toLocaleString("en-KE") },
        { key: "created_at", header: "Date" },
      ]}
      secondaryAction={{ href: `/admin/units/${id}`, label: "Back to Unit" }}
    />
  );
}
