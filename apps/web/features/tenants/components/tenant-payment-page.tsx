"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client/client";

type Tab = "mpesa-stk" | "mpesa-manual" | "bank";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "mpesa-stk", label: "M-Pesa STK Push", icon: "📲" },
  { id: "mpesa-manual", label: "Manual M-Pesa", icon: "📋" },
  { id: "bank", label: "Bank / Cash", icon: "🏦" },
];

function StkForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      await apiClient.post("/payments/initialize/daraja-stk", {
        phone: phone.replace(/^0/, "254").replace(/^\+/, ""),
        amount: Number(amount),
      });
      setResult({ success: true, message: "STK push sent to your phone. Enter your M-Pesa PIN to complete payment." });
      setTimeout(() => router.push("/tenant/payments"), 4000);
    } catch (err) {
      setResult({ success: false, message: err instanceof Error ? err.message : "Failed to send STK push. Check your phone number and try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="rounded-2xl bg-green-50 border border-green-200 px-4 py-3">
        <p className="text-sm font-bold text-green-800">Enter your Safaricom number and the amount. You will receive an M-Pesa prompt on your phone.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-black text-[#145F6B]">M-Pesa Phone Number <span className="text-red-500">*</span></label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07XX XXX XXX or 254XXXXXXXXX"
          className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20"
        />
        <p className="text-xs text-slate-500">Enter as 07XX XXX XXX or 254XXXXXXXXX</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-black text-[#145F6B]">Amount (KES) <span className="text-red-500">*</span></label>
        <input
          type="number"
          required
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 12000"
          className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20"
        />
      </div>

      {result && (
        <div className={`rounded-2xl px-4 py-3 text-sm font-bold ${result.success ? "bg-[#F0FBFF] text-[#145F6B] border border-[#C5F0F8]" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[#145F6B] px-5 py-3.5 text-sm font-black text-white disabled:opacity-60 hover:bg-[#145F6B]/90 transition-colors"
      >
        {loading ? "Sending STK push…" : "Pay via M-Pesa"}
      </button>
    </form>
  );
}

function ManualMpesaForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    try {
      await apiClient.post("/payments/manual/mpesa", {
        mpesaCode: fd.get("mpesaCode"),
        amount: Number(fd.get("amount")),
        phone: fd.get("phone"),
        notes: fd.get("notes"),
      });
      setResult({ success: true, message: "Payment reference submitted. Glamandi staff will verify and issue a receipt." });
      setTimeout(() => router.push("/tenant/payments"), 3500);
    } catch (err) {
      setResult({ success: false, message: err instanceof Error ? err.message : "Submission failed. Please check your reference code." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
        <p className="text-sm font-bold text-amber-800">Already paid via M-Pesa? Submit your transaction code and Glamandi will verify and issue your receipt.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-black text-[#145F6B]">M-Pesa Transaction Code <span className="text-red-500">*</span></label>
        <input name="mpesaCode" type="text" required placeholder="e.g. QGH7X82K9P" className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold uppercase outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-black text-[#145F6B]">Amount Paid (KES) <span className="text-red-500">*</span></label>
        <input name="amount" type="number" required min={1} placeholder="e.g. 12000" className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-black text-[#145F6B]">Sending Phone Number</label>
        <input name="phone" type="tel" placeholder="07XX XXX XXX" className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-black text-[#145F6B]">Notes (optional)</label>
        <textarea name="notes" rows={3} placeholder="e.g. March rent payment" className="w-full resize-none rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      </div>

      {result && (
        <div className={`rounded-2xl px-4 py-3 text-sm font-bold ${result.success ? "bg-[#F0FBFF] text-[#145F6B] border border-[#C5F0F8]" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {result.message}
        </div>
      )}

      <button type="submit" disabled={loading} className="w-full rounded-2xl bg-[#145F6B] px-5 py-3.5 text-sm font-black text-white disabled:opacity-60 hover:bg-[#145F6B]/90 transition-colors">
        {loading ? "Submitting…" : "Submit M-Pesa Reference"}
      </button>
    </form>
  );
}

function BankForm() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-[#F0FBFF] border border-[#C5F0F8] px-5 py-5 space-y-4">
        <h3 className="font-black text-[#145F6B]">Pay via Bank or Cash at Office</h3>

        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex justify-between border-b border-[#C5F0F8] pb-2">
            <span className="font-bold text-slate-500">Paybill Number</span>
            <span className="font-black text-[#145F6B]">522522</span>
          </div>
          <div className="flex justify-between border-b border-[#C5F0F8] pb-2">
            <span className="font-bold text-slate-500">Account Number</span>
            <span className="font-black text-[#145F6B]">Your Unit Number</span>
          </div>
          <div className="flex justify-between border-b border-[#C5F0F8] pb-2">
            <span className="font-bold text-slate-500">Bank</span>
            <span className="font-black text-[#145F6B]">KCB Bank Kenya</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-slate-500">Office Hours</span>
            <span className="font-black text-[#145F6B]">Mon–Fri, 8 AM – 5 PM</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
        <p className="text-sm text-slate-600">After paying at the bank or in cash at the office, please inform Glamandi staff or submit your manual M-Pesa reference using the <strong>Manual M-Pesa</strong> tab.</p>
      </div>

      <Link href="/tenant/payments" className="flex w-full items-center justify-center rounded-2xl border border-[#C5F0F8] bg-white px-5 py-3 text-sm font-black text-[#145F6B] hover:bg-[#F0FBFF] transition-colors">
        Back to Payment History
      </Link>
    </div>
  );
}

export function TenantPaymentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mpesa-stk");

  return (
    <div className="mx-auto max-w-xl space-y-6">
      {/* Header */}
      <div className="rounded-[2rem] border border-[#C5F0F8] bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/tenant/payments" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </Link>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3AC4FA]">Tenant Portal</p>
            <h1 className="text-xl font-black text-[#145F6B]">Make a Payment</h1>
          </div>
        </div>
        <p className="text-sm text-slate-600">Choose your preferred payment method below. Receipts are issued after verification.</p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition-all ${
              activeTab === tab.id
                ? "bg-[#145F6B] text-white shadow-sm"
                : "border border-[#C5F0F8] bg-white text-slate-600 hover:border-[#145F6B]/30 hover:text-[#145F6B]"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="rounded-[2rem] border border-[#C5F0F8] bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        {activeTab === "mpesa-stk" && <StkForm />}
        {activeTab === "mpesa-manual" && <ManualMpesaForm />}
        {activeTab === "bank" && <BankForm />}
      </div>

      {/* Help note */}
      <div className="rounded-2xl border border-[#C5F0F8]/60 bg-white/60 px-4 py-3 text-center">
        <p className="text-xs text-slate-500">Need help? Contact Glamandi on <span className="font-bold text-[#145F6B]">0725 021 737</span></p>
      </div>
    </div>
  );
}
