import type { ReactNode } from "react";
import { LogoMark } from "@/components/website/logo-mark";

export function AuthCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="w-full max-w-md rounded-[2rem] border border-[#C5F0F8] bg-white p-8 shadow-2xl shadow-[#145F6B]/10">
        <LogoMark />
        <h1 className="mt-6 text-3xl font-black text-[#145F6B]">{title}</h1>
        {description ? <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{description}</p> : null}
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
