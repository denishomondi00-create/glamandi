import type { Metadata } from "next";
import Link from "next/link";
import { serverApi } from "@/lib/api-client/server-fetcher";
import { Badge, StatCard } from "@/components/glamandi/page-kit";
export const metadata: Metadata = { title: "Reports | Glamandi Control Center" };
type Dashboard = { totalCollectedThisMonth: number; collectionRate: number; vacantUnits: number; occupiedUnits: number; openRepairs: number; pendingInquiries: number };
const reports = [
  { href: "/admin/reports/collections", label: "Collections", description: "Monthly rent collected vs. billed by property." },
  { href: "/admin/reports/occupancy", label: "Occupancy", description: "Vacant, occupied, and locked unit breakdown." },
  { href: "/admin/reports/defaulters", label: "Defaulters", description: "Tenants without payment this billing cycle." },
  { href: "/admin/reports/penalties", label: "Penalties", description: "Late fee totals, waiver rates, and band breakdown." },
  { href: "/admin/reports/commission", label: "Commission", description: "Monthly commission earned by property." },
  { href: "/admin/reports/repairs", label: "Repairs", description: "Open, in-progress, and completed repair tickets." },
  { href: "/admin/reports/deposits", label: "Deposits", description: "Security deposit collections and refund ledger." },
  { href: "/admin/reports/inquiries", label: "Inquiries", description: "Lead funnel — new, follow-up, converted." },
  { href: "/admin/reports/payment-channels", label: "Payment Channels", description: "Volume and value by payment method." },
];
export default async function Page() {
  let d: Dashboard | null = null;
  try { d = await serverApi.get<Dashboard>("/reports/dashboard", { cache: "no-store" }); } catch {}
  const stats = [
    { label: "Collected this month", value: `KES ${(d?.totalCollectedThisMonth ?? 0).toLocaleString("en-KE")}`, helper: "Posted payments" },
    { label: "Collection rate", value: `${d?.collectionRate ?? 0}%`, helper: "vs. billed" },
    { label: "Occupancy", value: d ? `${d.occupiedUnits}/${d.occupiedUnits + d.vacantUnits}` : "—", helper: "Occupied / Total" },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative"><Badge>Admin / Reports</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B]">Reports</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">Finance, occupancy, and operational reports aggregated from live MongoDB data.</p>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">{stats.map((s) => <StatCard key={s.label} stat={s} />)}</section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map(({ href, label, description }) => (
          <Link key={href} href={href} className="rounded-[1.4rem] border border-[#C5F0F8] bg-white p-5 shadow-sm hover:border-[#17DEFE] hover:shadow-md transition">
            <p className="font-black text-[#145F6B]">{label}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
