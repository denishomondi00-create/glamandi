"use client";

export function ConflictResolutionPanel({ conflicts = [] }: { conflicts?: Array<{ id: string; title: string; reason: string }> }) {
  if (!conflicts.length) {
    return <div className="rounded-[1.5rem] border border-[#C5F0F8] bg-white p-6 text-sm font-bold text-slate-500">No sync conflicts requiring review.</div>;
  }

  return (
    <div className="grid gap-3">
      {conflicts.map((conflict) => (
        <article key={conflict.id} className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-black text-amber-900">{conflict.title}</h3>
          <p className="mt-2 text-sm font-semibold text-amber-800">{conflict.reason}</p>
          <button className="mt-4 rounded-2xl bg-amber-700 px-4 py-2 text-sm font-black text-white">Open resolution</button>
        </article>
      ))}
    </div>
  );
}
