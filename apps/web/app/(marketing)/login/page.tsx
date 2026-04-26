import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Portal Login | Glamandi Homes",
  description: "Sign in to the Glamandi tenant, landlord, or admin portal.",
};

const portals = [
  { role: "Tenant", description: "View charges, pay rent, receipts & repairs", color: "bg-[#F0FBFF] border-[#C5F0F8]", text: "text-[#145F6B]" },
  { role: "Landlord", description: "Statements, payouts, occupancy & deductions", color: "bg-slate-50 border-slate-200", text: "text-slate-700" },
  { role: "Admin / Staff", description: "Full control center for Glamandi operations", color: "bg-[#145F6B]/5 border-[#145F6B]/20", text: "text-[#145F6B]" },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/logos/glamandi-logo-cropped.png"
            alt="Glamandi Homes"
            width={220}
            height={134}
            className="h-24 w-auto object-contain"
            priority
          />
          <p className="mt-3 text-sm text-slate-500">Sign in to your Glamandi portal</p>
        </div>

        {/* Login form card */}
        <div className="rounded-[2rem] border border-[#C5F0F8] bg-white p-6 shadow-xl shadow-[#145F6B]/8 sm:p-8">
          <LoginForm />
        </div>

        {/* Portal hint */}
        <div className="mt-8">
          <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.2em] text-slate-400">One login for all portals</p>
          <div className="grid gap-2">
            {portals.map((p) => (
              <div key={p.role} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${p.color}`}>
                <div className={`w-2 h-2 rounded-full bg-current ${p.text}`} />
                <div>
                  <p className={`text-sm font-black ${p.text}`}>{p.role}</p>
                  <p className="text-xs text-slate-500">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Having trouble? Contact Glamandi on <span className="font-bold text-[#145F6B]">0725 021 737</span>
        </p>
      </div>
    </div>
  );
}
