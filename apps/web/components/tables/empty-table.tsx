export function EmptyTable({ message = "No records found yet." }: { message?: string }) {
  return <div className="rounded-[1.4rem] border border-dashed border-[#C5F0F8] bg-white/80 p-8 text-center text-sm font-bold text-slate-500">{message}</div>;
}
