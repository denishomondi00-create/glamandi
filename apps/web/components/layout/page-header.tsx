import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-[#3AC4FA]">{eyebrow}</p> : null}
        <h1 className="text-3xl font-black tracking-tight text-[#145F6B] md:text-5xl">{title}</h1>
        {description ? <p className="mt-3 text-base font-medium leading-7 text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
