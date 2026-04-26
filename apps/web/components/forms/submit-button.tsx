"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ children = "Save" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="rounded-2xl bg-gradient-to-r from-[#17DEFE] to-[#3AC4FA] px-5 py-3 text-sm font-black text-[#073B46] shadow-lg shadow-[#17DEFE]/25 disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? "Saving..." : children}
    </button>
  );
}
