import { formatCurrency } from "@/lib/utils/currency";

export function BalanceCard({ label, amount, helper }: { label: string; amount: number; helper?: string }) {
  return (
    <div className="rounded-[2rem] bg-gradient-to-br from-[#145F6B] via-[#0f7282] to-[#17DEFE] p-6 text-white shadow-xl shadow-[#17DEFE]/25">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-white/70">{label}</p>
      <p className="mt-4 text-4xl font-black tracking-tight">{formatCurrency(amount)}</p>
      {helper ? <p className="mt-3 text-sm font-semibold text-white/80">{helper}</p> : null}
    </div>
  );
}
