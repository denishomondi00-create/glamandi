import Link from "next/link";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { Badge, GradientButton, StatCard, type StatItem } from "./page-kit";

export type ColumnDef = { key: string; header: string; format?: (v: unknown) => string };

export type AdminListPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  apiPath: string;
  columns: ColumnDef[];
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  rowHref?: (row: Record<string, unknown>) => string;
  extraStats?: StatItem[];
};

type PaginatedResult = { items: Record<string, unknown>[]; meta: { total: number; page: number; limit: number; totalPages: number } };

function fmtVal(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (v instanceof Date) return v.toLocaleDateString();
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric" });
  if (typeof v === "number") return v.toLocaleString("en-KE");
  return String(v);
}

export async function AdminListPage({
  eyebrow,
  title,
  description,
  apiPath,
  columns,
  primaryAction,
  secondaryAction,
  rowHref,
  extraStats = [],
}: AdminListPageProps) {
  let items: Record<string, unknown>[] = [];
  let total = 0;

  try {
    const res = await serverApi.get<PaginatedResult>(apiPath, { cache: "no-store" });
    items = res?.items ?? [];
    total = res?.meta?.total ?? 0;
  } catch {
    // gracefully show empty state — API may be down or not seeded yet
  }

  const stats: StatItem[] = [
    { label: "Total", value: String(total), helper: `From ${apiPath}` },
    { label: "Showing", value: String(items.length), helper: "Current page" },
    ...extraStats,
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <Badge>{eyebrow}</Badge>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B] sm:text-5xl">{title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {secondaryAction && <GradientButton href={secondaryAction.href} label={secondaryAction.label} tone="ghost" />}
            {primaryAction && <GradientButton href={primaryAction.href} label={primaryAction.label} />}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        {stats.slice(0, 3).map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      {/* Table */}
      <section className="rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        <h2 className="mb-4 text-lg font-black text-[#145F6B]">{title} — {total} record{total !== 1 ? "s" : ""}</h2>
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#C5F0F8] px-8 py-16 text-center">
            <p className="text-sm font-semibold text-slate-500">No records yet. Add your first {title.toLowerCase()} to get started.</p>
            {primaryAction && (
              <Link href={primaryAction.href} className="mt-4 inline-flex items-center rounded-2xl bg-[#145F6B] px-5 py-2.5 text-sm font-black text-white hover:bg-[#145F6B]/90">
                {primaryAction.label}
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-[1.4rem] border border-[#C5F0F8]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#C5F0F8] text-left text-sm">
                <thead className="bg-[#F0FBFF] text-xs font-black uppercase tracking-[0.18em] text-[#145F6B]">
                  <tr>
                    {columns.map((col) => <th key={col.key} className="px-4 py-3">{col.header}</th>)}
                    {rowHref && <th className="px-4 py-3">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5F0F8]/80">
                  {items.map((row, i) => (
                    <tr key={String(row._id ?? i)} className="hover:bg-[#F0FBFF]/80">
                      {columns.map((col) => (
                        <td key={col.key} className="px-4 py-3 font-semibold text-slate-700">
                          {col.format ? col.format(row[col.key]) : fmtVal(row[col.key])}
                        </td>
                      ))}
                      {rowHref && (
                        <td className="px-4 py-3">
                          <Link href={rowHref(row)} className="text-xs font-black text-[#145F6B] hover:underline">View →</Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
