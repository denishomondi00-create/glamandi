import { Section } from "@/components/layout/section";
import { MetricGrid } from "@/components/layout/metric-grid";
import { DataTable } from "@/components/tables/data-table";
import type { PenaltiesSummary } from "../schemas/penaltie.schema";

export function PenaltiesOverview({ data }: { data: PenaltiesSummary }) {
  return (
    <div className="grid gap-6">
      <Section title={data.title} description={data.description}>
        <MetricGrid items={data.metrics} />
      </Section>
      <Section title="Records" description="Role-scoped list connected through the shared API client.">
        <DataTable rows={data.records} columns={[{ key: "name", header: "Name" }, { key: "status", header: "Status" }, { key: "updated", header: "Updated" }]} />
      </Section>
    </div>
  );
}
