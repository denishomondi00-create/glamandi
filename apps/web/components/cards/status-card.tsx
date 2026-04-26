export function StatusCard({ title, status, description }: { title: string; status: string; description?: string }) {
  return (
    <article className="rounded-[1.5rem] border border-[#C5F0F8] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-[#145F6B]">{title}</h3>
        <span className="rounded-full bg-[#17DEFE]/15 px-3 py-1 text-xs font-black text-[#145F6B]">{status}</span>
      </div>
      {description ? <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{description}</p> : null}
    </article>
  );
}
