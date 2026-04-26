export function KeyValueTable({ rows }: { rows: Array<{ label: string; value: React.ReactNode }> }) {
  return (
    <dl className="divide-y divide-[#C5F0F8] rounded-[1.4rem] border border-[#C5F0F8] bg-white">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[14rem_1fr]">
          <dt className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{row.label}</dt>
          <dd className="font-bold text-[#145F6B]">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
