import { cn } from "@/lib/utils/formatters";

export type MetricCardProps = {
  label: string;
  value: string;
  helper?: string;
  tone?: "cyan" | "teal" | "warning" | "danger" | "neutral";
};

export function MetricCard({ label, value, helper, tone = "cyan" }: MetricCardProps) {
  const dot = {
    cyan: "bg-[#17DEFE]",
    teal: "bg-[#145F6B]",
    warning: "bg-amber-400",
    danger: "bg-red-400",
    neutral: "bg-slate-400",
  }[tone];
  return (
    <article className="glamandi-card rounded-[1.6rem] p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <span className={cn("mt-1 h-3 w-3 rounded-full", dot)} />
      </div>
      <p className="mt-4 text-3xl font-black tracking-tight text-[#145F6B]">{value}</p>
      {helper ? <p className="mt-2 text-sm font-semibold text-slate-500">{helper}</p> : null}
    </article>
  );
}
