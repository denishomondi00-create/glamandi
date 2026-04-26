import Link from "next/link";
import { formatCurrency } from "@/lib/utils/currency";

export function ListingCard({ title, location, rent, href }: { title: string; location: string; rent: number; href: string }) {
  return (
    <Link href={href} className="block overflow-hidden rounded-[2rem] border border-[#C5F0F8] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#17DEFE]/10">
      <div className="h-44 bg-gradient-to-br from-[#C5F0F8] to-[#17DEFE]/40" />
      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3AC4FA]">{location}</p>
        <h3 className="mt-2 text-xl font-black text-[#145F6B]">{title}</h3>
        <p className="mt-3 text-lg font-black text-[#181918]">{formatCurrency(rent)} / month</p>
      </div>
    </Link>
  );
}
