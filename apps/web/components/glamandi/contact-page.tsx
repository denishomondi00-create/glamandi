"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const INQUIRY_TYPES = [
  "Property Viewing Request",
  "Tenant Inquiry",
  "Landlord Onboarding",
  "Repair / Maintenance",
  "Payment Issue",
  "General Question",
];

const contacts = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
    ),
    label: "Phone / WhatsApp",
    value: "+254 725 021 737",
    href: "tel:+254725021737",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ),
    label: "Email",
    value: "info@glamandi.co.ke",
    href: "mailto:info@glamandi.co.ke",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    label: "Office",
    value: "Mtwapa, Kilifi County, Kenya",
    href: "https://maps.google.com/?q=Mtwapa,Kilifi,Kenya",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    label: "Office Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM",
    href: null,
  },
];

export function ContactPageContent() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const inquiryType = fd.get("inquiryType") as string;
    const message = fd.get("message") as string;

    const body = {
      fullName: fd.get("fullName"),
      phone: fd.get("phone"),
      email: fd.get("email") || undefined,
      source: "website",
      message: inquiryType ? `[${inquiryType}] ${message}` : message,
    };

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";
      const res = await fetch(`${apiBase}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { message?: string }).message ?? "Submission failed");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-12 max-w-2xl">
        <span className="inline-block rounded-full bg-[#145F6B]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#145F6B]">Contact us</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B] sm:text-5xl">Talk to Glamandi Homes.</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Send a viewing request, report an issue, or ask about landlord onboarding. We respond within one business day.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* ── Left: logo + contact info ── */}
        <div className="space-y-8">
          {/* Logo — transparent, large, always visible */}
          <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#F0FBFF] to-[#e0f7ff] p-6 sm:p-10">
            <Image
              src="/logos/glamandi-logo-transparent.png"
              alt="Glamandi Homes"
              width={621}
              height={379}
              className="w-full object-contain"
              priority
            />
          </div>

          {/* Contact detail cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-[#C5F0F8] bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#145F6B]/10 text-[#145F6B]">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#3AC4FA]">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-0.5 text-sm font-bold text-slate-700 hover:text-[#145F6B] hover:underline">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm font-bold text-slate-700">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/254725021737?text=Hello%20Glamandi%20Homes%2C%20I%20would%20like%20to%20enquire%20about%20your%20properties."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black text-white shadow-md hover:bg-[#20bd5a] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Chat on WhatsApp
          </a>

          {/* Logo — transparent, large */}
          <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#F0FBFF] to-[#e0f7ff] p-6 lg:p-8">
            <Image
              src="/logos/glamandi-logo-transparent.png"
              alt="Glamandi Homes"
              width={621}
              height={379}
              className="w-full max-w-xs sm:max-w-sm lg:max-w-full object-contain"
              priority
            />
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="rounded-[2rem] border border-[#C5F0F8] bg-white p-6 shadow-xl shadow-[#145F6B]/8 sm:p-8">
          {status === "success" ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#145F6B]/10 text-[#145F6B]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#145F6B]">Message received!</h2>
                <p className="mt-2 text-sm text-slate-600">Thank you for reaching out. The Glamandi team will get back to you within one business day.</p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-2xl border border-[#C5F0F8] px-6 py-2.5 text-sm font-black text-[#145F6B] hover:bg-[#F0FBFF] transition-colors"
              >
                Send another message
              </button>
              <Link href="/" className="text-sm text-slate-400 hover:text-[#145F6B] hover:underline">Back to home</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-black text-[#145F6B]">Send us a message</h2>
                <p className="mt-1 text-sm text-slate-500">All fields marked <span className="text-red-500">*</span> are required.</p>
              </div>

              {/* Full name */}
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="text-sm font-black text-[#145F6B]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Jane Mwangi"
                  className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#145F6B]/40 focus:ring-4 focus:ring-[#17DEFE]/20"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-black text-[#145F6B]">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+254 7XX XXX XXX"
                  className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#145F6B]/40 focus:ring-4 focus:ring-[#17DEFE]/20"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-black text-[#145F6B]">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com (optional)"
                  className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#145F6B]/40 focus:ring-4 focus:ring-[#17DEFE]/20"
                />
              </div>

              {/* Inquiry type */}
              <div className="space-y-1.5">
                <label htmlFor="inquiryType" className="text-sm font-black text-[#145F6B]">
                  What is this about? <span className="text-red-500">*</span>
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  required
                  className="w-full rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#145F6B]/40 focus:ring-4 focus:ring-[#17DEFE]/20"
                >
                  <option value="">— Select inquiry type —</option>
                  {INQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-black text-[#145F6B]">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us more — which property are you interested in, what issue are you facing, or any other details..."
                  className="w-full resize-none rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#145F6B]/40 focus:ring-4 focus:ring-[#17DEFE]/20"
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {errorMsg || "Something went wrong. Please call us directly on +254 725 021 737."}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#145F6B] px-6 py-4 text-sm font-black text-white shadow-md shadow-[#145F6B]/20 transition hover:bg-[#145F6B]/90 disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity=".3"/><path d="M21 12a9 9 0 00-9-9"/></svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                We respect your privacy. Your details are only used to respond to your inquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
