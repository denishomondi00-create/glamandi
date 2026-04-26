import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4 py-12">
      <div className="max-w-lg rounded-[2rem] border border-[#C5F0F8] bg-white p-8 text-center shadow-xl shadow-[#145F6B]/5">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-[#17DEFE]/15 text-2xl">⌂</div>
        <h1 className="text-2xl font-black text-[#145F6B]">{title}</h1>
        {description ? <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{description}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </main>
  );
}
