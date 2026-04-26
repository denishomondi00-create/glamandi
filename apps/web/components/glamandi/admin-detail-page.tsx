import Link from "next/link";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { Badge, GradientButton } from "./page-kit";

export type FieldDef = { key: string; label: string; format?: (v: unknown) => string };

export type AdminDetailPageProps = {
  eyebrow: string;
  title: string;
  apiPath: string;
  fields: FieldDef[];
  tabs?: Array<{ label: string; href: string }>;
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  notFoundMessage?: string;
};

function fmtVal(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "object") return JSON.stringify(v);
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return new Date(v).toLocaleDateString("en-KE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  if (typeof v === "number") return v.toLocaleString("en-KE");
  return String(v);
}

export async function AdminDetailPage({
  eyebrow,
  title,
  apiPath,
  fields,
  tabs,
  primaryAction,
  secondaryAction,
  notFoundMessage,
}: AdminDetailPageProps) {
  let record: Record<string, unknown> | null = null;

  try {
    record = await serverApi.get<Record<string, unknown>>(apiPath, { cache: "no-store" });
  } catch {
    // record not found or API down
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div>
            <Badge>{eyebrow}</Badge>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B] sm:text-5xl">{title}</h1>
            {record && <p className="mt-2 font-mono text-xs text-slate-400">ID: {String(record._id ?? "—")}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            {secondaryAction && <GradientButton href={secondaryAction.href} label={secondaryAction.label} tone="ghost" />}
            {primaryAction && <GradientButton href={primaryAction.href} label={primaryAction.label} />}
          </div>
        </div>
      </section>

      {/* Tab navigation */}
      {tabs && tabs.length > 0 && (
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link key={tab.href} href={tab.href} className="rounded-2xl border border-[#C5F0F8] bg-white px-4 py-2 text-sm font-black text-[#145F6B] hover:border-[#17DEFE] hover:bg-[#F0FBFF]">
              {tab.label}
            </Link>
          ))}
        </nav>
      )}

      {/* Detail fields */}
      <section className="rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        {!record ? (
          <div className="rounded-2xl border border-dashed border-[#C5F0F8] px-8 py-16 text-center">
            <p className="text-sm font-semibold text-slate-500">{notFoundMessage ?? "Record not found."}</p>
          </div>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map(({ key, label, format }) => (
              <div key={key} className="rounded-2xl border border-[#C5F0F8] bg-[#F0FBFF]/50 p-4">
                <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#145F6B]">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-slate-700 break-words">
                  {format ? format(record![key]) : fmtVal(record![key])}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </div>
  );
}
