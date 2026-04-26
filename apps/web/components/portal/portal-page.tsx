import { PageHeader } from "@/components/layout/page-header";
import { MetricGrid } from "@/components/layout/metric-grid";
import { Section } from "@/components/layout/section";
import { DataTable } from "@/components/tables/data-table";
import type { MetricCardProps } from "@/components/cards/metric-card";

export type PortalPageData = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: MetricCardProps[];
  panels: Array<{ title: string; description: string; items?: string[] }>;
  rows: Array<Record<string, string | number>>;
};

export function PortalPage({ data }: { data: PortalPageData }) {
  return (
    <div>
      <PageHeader eyebrow={data.eyebrow} title={data.title} description={data.description} />
      <MetricGrid items={data.metrics} />
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-4">
          {data.panels.map((panel) => (
            <Section key={panel.title} title={panel.title} description={panel.description}>
              {panel.items?.length ? <ul className="grid gap-2 text-sm font-bold text-slate-600">{panel.items.map((item) => <li key={item}>• {item}</li>)}</ul> : null}
            </Section>
          ))}
        </div>
        <Section title="Recent records" description="Connect this table to the matching API endpoint, with pagination and role-scoped filters.">
          <DataTable rows={data.rows} columns={[{ key: "name", header: "Name" }, { key: "status", header: "Status" }, { key: "updated", header: "Updated" }]} />
        </Section>
      </div>
    </div>
  );
}
