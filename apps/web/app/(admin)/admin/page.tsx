import type { Metadata } from "next";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { Badge, StatCard } from "@/components/glamandi/page-kit";
import Link from "next/link";

export const metadata: Metadata = { title: "Command Center | Glamandi Control Center" };

type Dashboard = {
  totalRentBilledThisMonth: number;
  totalCollectedThisMonth: number;
  outstandingBalances: number;
  collectionRate: number;
  lateTenants: number;
  vacantUnits: number;
  occupiedUnits: number;
  activeTenants: number;
  openRepairs: number;
  pendingInquiries: number;
  openPenalties: number;
  offlineRecordsPendingSync: number;
  syncConflictsRequiringAdminReview: number;
};

const KES = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

const quickLinks = [
  { href: "/admin/tenants", label: "Tenants" },
  { href: "/admin/payments/new", label: "Record Payment" },
  { href: "/admin/tenancies/new", label: "New Tenancy" },
  { href: "/admin/repairs", label: "Repairs" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/payouts", label: "Payouts" },
  { href: "/admin/audit", label: "Audit Log" },
];

export default async function Page() {
  let d: Dashboard | null = null;
  try {
    d = await serverApi.get<Dashboard>("/reports/dashboard", { cache: "no-store" });
  } catch { /* API may not be running yet */ }

  const stats = [
    { label: "Billed this month", value: KES(d?.totalRentBilledThisMonth ?? 0), helper: "Total charges raised" },
    { label: "Collected this month", value: KES(d?.totalCollectedThisMonth ?? 0), helper: "Posted payments" },
    { label: "Outstanding", value: KES(d?.outstandingBalances ?? 0), helper: "Open charge balances" },
    { label: "Collection rate", value: `${d?.collectionRate ?? 0}%`, helper: "vs. billed" },
    { label: "Active tenants", value: String(d?.activeTenants ?? 0), helper: "Current leases" },
    { label: "Late tenants", value: String(d?.lateTenants ?? 0), helper: "No payment this month" },
    { label: "Vacant units", value: String(d?.vacantUnits ?? 0), helper: "Available for letting" },
    { label: "Occupied units", value: String(d?.occupiedUnits ?? 0), helper: "Currently tenanted" },
    { label: "Open repairs", value: String(d?.openRepairs ?? 0), helper: "Awaiting resolution" },
    { label: "Pending inquiries", value: String(d?.pendingInquiries ?? 0), helper: "Needs follow-up" },
    { label: "Sync pending", value: String(d?.offlineRecordsPendingSync ?? 0), helper: "Offline batches" },
    { label: "Sync conflicts", value: String(d?.syncConflictsRequiringAdminReview ?? 0), helper: "Admin review needed" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative">
          <Badge>Glamandi Control Center</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B] sm:text-5xl">Command Center</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Rent collection, occupancy, repairs, offline sync, inquiries, landlord payouts, and audit-sensitive actions — all in one place.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </section>

      <section className="rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        <h2 className="mb-4 text-lg font-black text-[#145F6B]">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="rounded-2xl border border-[#C5F0F8] bg-[#F0FBFF] px-4 py-2.5 text-sm font-black text-[#145F6B] hover:border-[#17DEFE] hover:bg-white transition">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
