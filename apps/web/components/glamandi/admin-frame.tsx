import Link from "next/link";
import type { ReactNode } from "react";
import { Badge, GlamandiLogo, GradientButton } from "./page-kit";

const navGroups = [
  { label: "Core", links: [["Dashboard", "/admin"], ["Properties", "/admin/properties"], ["Units", "/admin/units"], ["Tenants", "/admin/tenants"], ["Landlords", "/admin/landlords"], ["Tenancies", "/admin/tenancies"]] },
  { label: "Finance", links: [["Charges", "/admin/charges"], ["Payments", "/admin/payments"], ["Receipts", "/admin/receipts"], ["Penalties", "/admin/penalties"], ["Deposits", "/admin/deposits"], ["Statements", "/admin/statements"], ["Payouts", "/admin/payouts"]] },
  { label: "Operations", links: [["Utilities", "/admin/utilities"], ["Repairs", "/admin/repairs"], ["Inquiries", "/admin/inquiries"], ["Offline Sync", "/admin/offline-sync"], ["Website", "/admin/website"], ["Reports", "/admin/reports"]] },
  { label: "System", links: [["Users", "/admin/users"], ["Roles", "/admin/roles"], ["Audit", "/admin/audit"], ["Settings", "/admin/settings"]] },
];

export function AdminFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0FBFF] text-[#181918]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#C5F0F8]/80 bg-white/95 p-5 shadow-xl shadow-[#145F6B]/5 xl:block">
        <GlamandiLogo />
        <div className="mt-6 rounded-[1.5rem] border border-[#C5F0F8] bg-gradient-to-br from-[#145F6B] to-[#181918] p-4 text-white">
          <Badge tone="light">Offline-aware</Badge>
          <p className="mt-3 text-sm leading-6 text-white/75">Draft safely when the internet decides to audition as a candle.</p>
        </div>
        <nav className="mt-6 space-y-6 overflow-y-auto pb-8">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-black uppercase tracking-[0.24em] text-[#3AC4FA]">{group.label}</p>
              <div className="mt-2 grid gap-1">
                {group.links.map(([label, href]) => (
                  <Link key={href} href={href} className="rounded-2xl px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-[#F0FBFF] hover:text-[#145F6B]">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <div className="xl:pl-72">
        <header className="sticky top-0 z-30 border-b border-[#C5F0F8]/80 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="xl:hidden"><GlamandiLogo compact /></div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3AC4FA]">Glamandi Control Center</p>
              <p className="text-sm text-slate-600">MongoDB is truth. IndexedDB is temporary field notes. May the accountants rejoice.</p>
            </div>
            <div className="hidden gap-3 md:flex">
              <GradientButton href="/admin/offline-sync" label="Sync Status" tone="ghost" />
              <GradientButton href="/admin/payments/new" label="Record Payment" />
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
