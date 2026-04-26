import Link from "next/link";

export function HeroPanel() {
  return (
    <section className="rounded-[2.5rem] bg-gradient-to-br from-[#145F6B] via-[#0e7a88] to-[#17DEFE] p-8 text-white shadow-2xl shadow-[#17DEFE]/20 md:p-12">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-white/70">Glamandi Homes</p>
      <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Property management that turns houses into accountable homes.</h1>
      <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/80">Listings, tenant operations, landlord statements, payments, repairs, receipts, and offline work all connected to one source of truth.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/properties" className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#145F6B]">View properties</Link>
        <Link href="/contact" className="rounded-2xl border border-white/40 px-5 py-3 text-sm font-black text-white">Make inquiry</Link>
      </div>
    </section>
  );
}
