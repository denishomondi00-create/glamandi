import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/glamandi/page-kit";
export const metadata: Metadata = { title: "Settings | Glamandi Control Center" };
const sections = [
  { href: "/admin/settings/business-rules", label: "Business Rules", description: "Core operational rules for rent, billing day, and notices." },
  { href: "/admin/settings/commission-rules", label: "Commission Rules", description: "Commission rates by property and management type." },
  { href: "/admin/settings/deposit-rules", label: "Deposit Rules", description: "Deposit calculation policies and refund conditions." },
  { href: "/admin/settings/penalty-rules", label: "Penalty Rules", description: "Late payment penalty bands, grace periods, and caps." },
  { href: "/admin/settings/payment-methods", label: "Payment Methods", description: "Enabled payment channels and gateway credentials." },
  { href: "/admin/settings/notification-rules", label: "Notification Rules", description: "SMS, email, and in-app notification triggers." },
  { href: "/admin/settings/offline-rules", label: "Offline Rules", description: "IndexedDB sync policies, conflict resolution strategy." },
  { href: "/admin/settings/website-rules", label: "Website Rules", description: "Public listing rules, auto-publish, and inquiry routing." },
];
export default function Page() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative"><Badge>Admin / Settings</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B]">Settings</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">System-wide configuration for business rules, payment channels, notifications, and offline sync behavior.</p>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ href, label, description }) => (
          <Link key={href} href={href} className="rounded-[1.4rem] border border-[#C5F0F8] bg-white p-5 shadow-sm hover:border-[#17DEFE] hover:shadow-md transition">
            <p className="font-black text-[#145F6B]">{label}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
