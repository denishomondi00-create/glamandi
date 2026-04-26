import type { TextareaHTMLAttributes } from "react";

export function TextareaField({ label, hint, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-[#145F6B]">{label}</span>
      <textarea {...props} className="min-h-32 rounded-2xl border border-[#C5F0F8] bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#17DEFE] focus:ring-4 focus:ring-[#17DEFE]/20" />
      {hint ? <span className="text-xs font-semibold text-slate-500">{hint}</span> : null}
    </label>
  );
}
