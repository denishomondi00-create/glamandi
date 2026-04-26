import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { MetricGrid } from "@/components/layout/metric-grid";
import { Section } from "@/components/layout/section";
import type { MetricCardProps } from "@/components/cards/metric-card";

export type PortalPageData = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: MetricCardProps[];
  panels: Array<{ title: string; description: string; items?: string[] }>;
  rows: Array<Record<string, string | number>>;
  columns?: Array<{ key: string; header: string }>;
  primaryAction?: { href: string; label: string };
};

function deriveColumns(rows: Array<Record<string, string | number>>, defined?: Array<{ key: string; header: string }>) {
  if (defined?.length) return defined;
  if (!rows.length) return [];
  return Object.keys(rows[0])
    .filter((k) => k !== "id")
    .slice(0, 6)
    .map((k) => ({ key: k, header: k.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }));
}

export function PortalPage({ data }: { data: PortalPageData }) {
  const columns = deriveColumns(data.rows, data.columns);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader eyebrow={data.eyebrow} title={data.title} description={data.description} />
        {data.primaryAction && (
          <Link
            href={data.primaryAction.href}
            className="shrink-0 rounded-2xl bg-[#145F6B] px-5 py-2.5 text-sm font-black text-white hover:bg-[#145F6B]/90 transition-colors"
          >
            {data.primaryAction.label}
          </Link>
        )}
      </div>

      <MetricGrid items={data.metrics} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.6fr]">
        {/* Info panels */}
        <div className="grid gap-4 content-start">
          {data.panels.map((panel) => (
            <Section key={panel.title} title={panel.title} description={panel.description}>
              {panel.items?.length ? (
                <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-600">
                  {panel.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#3AC4FA]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Section>
          ))}
        </div>

        {/* Data table */}
        <div className="rounded-[1.5rem] border border-[#C5F0F8] bg-white shadow-sm">
          <div className="border-b border-[#C5F0F8] px-5 py-4">
            <h2 className="font-black text-[#145F6B]">Records</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing up to 10 most recent</p>
          </div>

          {data.rows.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm font-semibold text-slate-400">No records found.</p>
              {data.primaryAction && (
                <Link href={data.primaryAction.href} className="mt-3 inline-block text-sm font-black text-[#145F6B] underline">
                  {data.primaryAction.label}
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#C5F0F8] text-sm">
                <thead>
                  <tr className="bg-[#F0FBFF]">
                    {columns.map((col) => (
                      <th key={col.key} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-[0.18em] text-[#145F6B]">
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5F0F8]/60">
                  {data.rows.map((row, i) => (
                    <tr key={String(row.id ?? i)} className="hover:bg-[#F0FBFF]/40">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3 font-semibold text-slate-700">
                          {row[col.key] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
