import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/glamandi/page-kit";
export const metadata: Metadata = { title: "Record Payment | Glamandi Control Center" };
const channels = [
  { href: "/admin/payments/manual-mpesa", label: "Manual M-Pesa", description: "Record a direct M-Pesa transfer using a transaction code." },
  { href: "/admin/payments/manual-kcb", label: "Manual KCB", description: "Record a KCB bank deposit or transfer." },
  { href: "/admin/payments/cash", label: "Cash", description: "Record a cash payment received in office." },
  { href: "/admin/payments/paystack", label: "Paystack Online", description: "Initialize a Paystack payment link for the tenant." },
  { href: "/admin/payments/daraja-stk", label: "Daraja STK Push", description: "Initiate an M-Pesa STK push via Daraja API." },
];
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative">
          <Badge>Admin / Payments</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B]">Record Payment</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">Choose a payment channel. All payments post to MongoDB and generate a receipt after server verification.</p>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        {channels.map(({ href, label, description }) => (
          <Link key={href} href={href} className="rounded-[1.4rem] border border-[#C5F0F8] bg-white p-5 shadow-sm hover:border-[#17DEFE] hover:shadow-md transition">
            <p className="font-black text-[#145F6B]">{label}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
