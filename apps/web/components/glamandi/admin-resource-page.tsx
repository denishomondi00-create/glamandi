import { Badge, EmptyState, FormField, FormPreview, GradientButton, InfoPanel, PanelItem, SimpleTable, StatCard, StatItem, Surface, TableConfig } from "./page-kit";

export type AdminResourcePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  recordId?: string;
  apiRoute?: string;
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  stats?: StatItem[];
  panels?: PanelItem[];
  table?: TableConfig;
  formTitle?: string;
  formFields?: FormField[];
  offlineNote?: string;
  financeNote?: string;
  dangerNote?: string;
};

const defaultStats: StatItem[] = [
  { label: "Records", value: "Live", helper: "Ready for API data" },
  { label: "Audit", value: "On", helper: "Sensitive actions traced" },
  { label: "Sync", value: "Aware", helper: "Offline rules respected" },
];

const defaultTable: TableConfig = {
  title: "Recent records",
  description: "Placeholder table wired for API data from the matching endpoint.",
  columns: ["Name", "Status", "Owner", "Updated"],
  rows: [
    ["Sample record", "Active", "Glamandi", "Today"],
    ["Review item", "Pending", "Staff", "Yesterday"],
    ["Archived sample", "Closed", "Admin", "This month"],
  ],
};

export function AdminResourcePage({
  eyebrow,
  title,
  description,
  recordId,
  apiRoute,
  primaryAction,
  secondaryAction,
  stats = defaultStats,
  panels = [],
  table = defaultTable,
  formTitle,
  formFields,
  offlineNote,
  financeNote,
  dangerNote,
}: AdminResourcePageProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-3xl">
            <Badge>{eyebrow}</Badge>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B] sm:text-5xl">{title}</h1>
            <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
            {recordId && <p className="mt-3 rounded-2xl bg-[#F0FBFF] px-4 py-2 text-sm font-bold text-[#145F6B]">Record ID: {recordId}</p>}
            {apiRoute && <p className="mt-3 font-mono text-xs text-slate-500">API route: {apiRoute}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            {secondaryAction && <GradientButton href={secondaryAction.href} label={secondaryAction.label} tone="ghost" />}
            {primaryAction && <GradientButton href={primaryAction.href} label={primaryAction.label} />}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      {(offlineNote || financeNote || dangerNote) && (
        <section className="grid gap-4 lg:grid-cols-3">
          {offlineNote && <InfoPanel panel={{ title: "Offline behavior", description: offlineNote, items: ["Draft locally", "Sync through /sync/push", "Resolve conflicts server-side"] }} />}
          {financeNote && <InfoPanel panel={{ title: "Finance rule", description: financeNote, items: ["No hard delete", "Reverse with reason", "Receipt after posting"] }} />}
          {dangerNote && <InfoPanel panel={{ title: "Admin caution", description: dangerNote, items: ["Permission required", "Audit log written", "Review before final action"] }} />}
        </section>
      )}

      {formTitle && formFields?.length ? <FormPreview title={formTitle} fields={formFields} /> : null}

      {panels.length ? (
        <section className="grid gap-4 lg:grid-cols-2">
          {panels.map((panel) => <InfoPanel key={panel.title} panel={panel} />)}
        </section>
      ) : null}

      <SimpleTable table={table} />

      <EmptyState
        title="Implementation note"
        description="This page is designed as a route-level UI scaffold. Connect it to server loaders, TanStack Query, mutations, and the NestJS endpoint named above. Do not let a pretty dashboard become a decorative liar."
        action={primaryAction}
      />
    </div>
  );
}
