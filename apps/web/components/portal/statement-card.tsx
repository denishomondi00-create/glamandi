import Link from "next/link";
import { formatCurrency } from "@/lib/utils/currency";

export function StatementCard({ id, period, amount, status }: { id: string; period: string; amount: number; status: string }) {
  return (
    <Link href={`/landlord/statements/${id}`} className="block rounded-[1.5rem] border border-[#C5F0F8] bg-white p-5 shadow-sm hover:border-[#17DEFE]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-black text-[#145F6B]">{period}</h3>
        <span className="rounded-full bg-[#17DEFE]/15 px-3 py-1 text-xs font-black text-[#145F6B]">{status}</span>
      </div>
      <p className="mt-3 text-2xl font-black text-[#181918]">{formatCurrency(amount)}</p>
    </Link>
  );
}
