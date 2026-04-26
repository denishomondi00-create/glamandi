import Link from "next/link";
import type { ReactNode } from "react";

export const GLAMANDI = {
  cyan: "#17DEFE",
  sky: "#3AC4FA",
  aqua: "#32D2F7",
  ice: "#C5F0F8",
  teal: "#145F6B",
  ink: "#181918",
  mist: "#F0FBFF",
};

export type StatItem = {
  label: string;
  value: string;
  helper?: string;
};

export type ActionItem = {
  label: string;
  href: string;
  tone?: "primary" | "ghost" | "danger";
};

export type PanelItem = {
  title: string;
  description: string;
  items?: string[];
};

export type TableConfig = {
  title: string;
  description?: string;
  columns: string[];
  rows: string[][];
};

export type FormField = {
  label: string;
  placeholder?: string;
  type?: string;
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GlamandiLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[#C5F0F8]/80 bg-white shadow-sm shadow-[#17DEFE]/20">
        <img
          src="/logos/glamandi-logo.jpeg"
          alt="Glamandi Homes logo"
          className="h-full w-full object-contain p-1"
        />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block text-lg font-black tracking-tight text-[#145F6B]">Glamandi Homes</span>
          <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-[#3AC4FA]">
            Control Center
          </span>
        </span>
      )}
    </Link>
  );
}

export function Badge({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "dark" | "light" | "danger" }) {
  const toneClass = {
    cyan: "border-[#17DEFE]/40 bg-[#17DEFE]/10 text-[#145F6B]",
    dark: "border-[#145F6B]/20 bg-[#145F6B] text-white",
    light: "border-[#C5F0F8] bg-white text-[#145F6B]",
    danger: "border-red-200 bg-red-50 text-red-700",
  }[tone];

  return <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-bold", toneClass)}>{children}</span>;
}

export function GradientButton({ href, children, tone = "primary" }: ActionItem & { children?: ReactNode }) {
  const label = children ?? href;
  if (tone === "ghost") {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-2xl border border-[#C5F0F8] bg-white px-5 py-3 text-sm font-black text-[#145F6B] shadow-sm transition hover:border-[#17DEFE] hover:shadow-md"
      >
        {label}
      </Link>
    );
  }

  if (tone === "danger") {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-black text-red-700 shadow-sm transition hover:bg-red-100"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#17DEFE] via-[#32D2F7] to-[#3AC4FA] px-5 py-3 text-sm font-black text-[#073B46] shadow-lg shadow-[#17DEFE]/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#17DEFE]/40"
    >
      {label}
    </Link>
  );
}

export function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[2rem] border border-[#C5F0F8]/80 bg-white/90 p-6 shadow-xl shadow-[#145F6B]/5 backdrop-blur", className)}>
      {children}
    </section>
  );
}

export function StatCard({ stat }: { stat: StatItem }) {
  return (
    <Surface className="p-5">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#3AC4FA]">{stat.label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-[#145F6B]">{stat.value}</p>
      {stat.helper && <p className="mt-2 text-sm leading-6 text-slate-600">{stat.helper}</p>}
    </Surface>
  );
}

export function InfoPanel({ panel }: { panel: PanelItem }) {
  return (
    <Surface>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#145F6B]">{panel.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{panel.description}</p>
        </div>
        <span className="h-3 w-3 shrink-0 rounded-full bg-[#17DEFE] shadow-[0_0_22px_rgba(23,222,254,0.7)]" />
      </div>
      {panel.items?.length ? (
        <ul className="mt-5 grid gap-2 text-sm text-slate-700">
          {panel.items.map((item) => (
            <li key={item} className="flex gap-2 rounded-2xl bg-[#F0FBFF] px-4 py-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#3AC4FA]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </Surface>
  );
}

export function SimpleTable({ table }: { table: TableConfig }) {
  return (
    <Surface className="overflow-hidden p-0">
      <div className="border-b border-[#C5F0F8]/70 bg-gradient-to-r from-[#F0FBFF] to-white p-6">
        <h3 className="text-lg font-black text-[#145F6B]">{table.title}</h3>
        {table.description && <p className="mt-2 text-sm text-slate-600">{table.description}</p>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F0FBFF] text-xs uppercase tracking-[0.16em] text-[#145F6B]">
            <tr>
              {table.columns.map((column) => (
                <th key={column} className="px-5 py-4 font-black">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5F0F8]/70 bg-white">
            {table.rows.map((row, rowIndex) => (
              <tr key={row.join("-") + rowIndex} className="hover:bg-[#F0FBFF]/70">
                {row.map((cell, cellIndex) => (
                  <td key={cell + cellIndex} className={cn("px-5 py-4", cellIndex === 0 && "font-bold text-[#145F6B]")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

export function FormPreview({ title, fields }: { title: string; fields: FormField[] }) {
  return (
    <Surface>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-[#145F6B]">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">Frontend-ready form layout. Wire this to the matching NestJS endpoint when the module is connected.</p>
        </div>
        <Badge>Draft UI</Badge>
      </div>
      <form className="mt-6 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.label} className={cn("grid gap-2 text-sm font-bold text-[#145F6B]", field.type === "textarea" && "md:col-span-2")}>
            {field.label}
            {field.type === "textarea" ? (
              <textarea className="min-h-28 rounded-2xl border border-[#C5F0F8] bg-white px-4 py-3 text-slate-800 outline-none ring-[#17DEFE]/20 focus:ring-4" placeholder={field.placeholder} />
            ) : field.type === "select" ? (
              <select className="rounded-2xl border border-[#C5F0F8] bg-white px-4 py-3 text-slate-800 outline-none ring-[#17DEFE]/20 focus:ring-4">
                <option>{field.placeholder || "Select option"}</option>
              </select>
            ) : (
              <input type={field.type || "text"} className="rounded-2xl border border-[#C5F0F8] bg-white px-4 py-3 text-slate-800 outline-none ring-[#17DEFE]/20 focus:ring-4" placeholder={field.placeholder} />
            )}
          </label>
        ))}
        <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
          <button type="button" className="rounded-2xl bg-gradient-to-r from-[#17DEFE] to-[#3AC4FA] px-5 py-3 text-sm font-black text-[#073B46] shadow-lg shadow-[#17DEFE]/25">Save draft</button>
          <button type="button" className="rounded-2xl border border-[#C5F0F8] bg-white px-5 py-3 text-sm font-black text-[#145F6B]">Cancel</button>
        </div>
      </form>
    </Surface>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ActionItem }) {
  return (
    <Surface className="bg-gradient-to-br from-[#145F6B] to-[#181918] text-white">
      <Badge tone="light">Glamandi Control Center</Badge>
      <h3 className="mt-5 text-2xl font-black">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{description}</p>
      {action && <div className="mt-5"><GradientButton {...action}>{action.label}</GradientButton></div>}
    </Surface>
  );
}
