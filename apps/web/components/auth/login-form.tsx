"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client/client";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    try {
      await apiClient.post("/auth/login", { email: form.get("email"), password: form.get("password") });
      setMessage("Login accepted. Redirect based on role after auth wiring is complete.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input name="email" type="email" required placeholder="Email address" className="rounded-2xl border border-[#C5F0F8] px-4 py-3 font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      <input name="password" type="password" required placeholder="Password" className="rounded-2xl border border-[#C5F0F8] px-4 py-3 font-semibold outline-none focus:ring-4 focus:ring-[#17DEFE]/20" />
      <button disabled={loading} className="rounded-2xl bg-[#145F6B] px-5 py-3 font-black text-white disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
      {message ? <p className="text-sm font-bold text-[#145F6B]">{message}</p> : null}
    </form>
  );
}
