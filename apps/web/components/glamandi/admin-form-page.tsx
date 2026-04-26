"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client/client";
import { Badge } from "./page-kit";
import Link from "next/link";

export type FormInputDef = {
  key: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea" | "password";
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

export type AdminFormPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  apiPath: string;
  method?: "POST" | "PATCH";
  fields: FormInputDef[];
  successRedirect?: string;
  secondaryAction?: { href: string; label: string };
};

export function AdminFormPage({
  eyebrow,
  title,
  description,
  apiPath,
  method = "POST",
  fields,
  successRedirect,
  secondaryAction,
}: AdminFormPageProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    const body: Record<string, unknown> = {};
    fields.forEach(({ key, type }) => {
      const v = data.get(key);
      if (v !== null && v !== "") {
        body[key] = type === "number" ? Number(v) : v;
      }
    });
    try {
      if (method === "PATCH") {
        await apiClient.patch(apiPath, body);
      } else {
        await apiClient.post(apiPath, body);
      }
      setSuccess(true);
      if (successRedirect) router.push(successRedirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5 lg:p-8">
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#17DEFE]/20 blur-3xl" />
        <div className="relative">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#145F6B]">{title}</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#C5F0F8]/80 bg-white p-6 shadow-xl shadow-[#145F6B]/5">
        <form onSubmit={onSubmit} className="grid gap-5">
          {fields.map(({ key, label, type = "text", placeholder, options, required }) => (
            <div key={key} className="grid gap-1.5">
              <label htmlFor={key} className="text-sm font-black text-[#145F6B]">
                {label}{required && <span className="ml-1 text-red-500">*</span>}
              </label>
              {type === "select" && options ? (
                <select id={key} name={key} required={required} className="rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20">
                  <option value="">— Select —</option>
                  {options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : type === "textarea" ? (
                <textarea id={key} name={key} required={required} placeholder={placeholder} rows={4} className="rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20 resize-none" />
              ) : (
                <input id={key} name={key} type={type} required={required} placeholder={placeholder} className="rounded-2xl border border-[#C5F0F8] px-4 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
              )}
            </div>
          ))}

          {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
          {success && <p className="rounded-2xl bg-[#F0FBFF] px-4 py-3 text-sm font-bold text-[#145F6B]">Saved successfully.</p>}

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-2xl bg-[#145F6B] px-6 py-3 text-sm font-black text-white disabled:opacity-60 hover:bg-[#145F6B]/90">
              {saving ? "Saving…" : "Save"}
            </button>
            {secondaryAction && (
              <Link href={secondaryAction.href} className="rounded-2xl border border-[#C5F0F8] bg-white px-5 py-3 text-sm font-black text-[#145F6B] hover:border-[#17DEFE]">
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
