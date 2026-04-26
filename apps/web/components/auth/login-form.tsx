"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client/client";
import { authCookieNames } from "@/lib/auth/cookies";

type LoginResponse = { accessToken: string; user: { role: string } };

const PORTAL_REDIRECT: Record<string, string> = {
  admin: "/admin",
  staff: "/admin",
  landlord: "/landlord",
  tenant: "/tenant",
};

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    try {
      const res = await apiClient.post<LoginResponse>("/auth/login", { email: form.get("email"), password: form.get("password") });
      const { accessToken, user } = res;
      const maxAge = 60 * 60 * 24 * 7; // 7 days
      document.cookie = `${authCookieNames.accessToken}=${accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `${authCookieNames.role}=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;
      router.push(PORTAL_REDIRECT[user.role] ?? "/admin");
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
