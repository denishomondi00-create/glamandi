import type { ReactNode } from "react";
import { cn } from "@/lib/utils/formatters";

export function Section({ title, description, children, className }: { title?: string; description?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("glamandi-card rounded-[2rem] p-6", className)}>
      {(title || description) ? (
        <header className="mb-5">
          {title ? <h2 className="text-xl font-black text-[#145F6B]">{title}</h2> : null}
          {description ? <p className="mt-1 text-sm font-medium leading-6 text-slate-600">{description}</p> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}
