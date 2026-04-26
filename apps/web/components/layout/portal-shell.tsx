"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { NavItem } from "@/components/nav/sidebar-nav";
import { cn } from "@/lib/utils/formatters";

function NavLink({ item, onClick }: { item: NavItem; onClick?: () => void }) {
  const pathname = usePathname();
  const active =
    pathname === item.href ||
    (item.href.split("/").length > 2 && pathname.startsWith(item.href + "/")) ||
    (item.href.split("/").length === 2 && pathname === item.href);
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
        active
          ? "bg-[#145F6B] text-white shadow-sm"
          : "text-slate-600 hover:bg-[#F0FBFF] hover:text-[#145F6B]",
      )}
    >
      <span>{item.label}</span>
      {item.badge && (
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black">{item.badge}</span>
      )}
    </Link>
  );
}

function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    document.cookie = "glamandi_access_token=; max-age=0; path=/";
    document.cookie = "glamandi_refresh_token=; max-age=0; path=/";
    document.cookie = "glamandi_role=; max-age=0; path=/";
    router.push("/login");
  }
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-xl border border-[#C5F0F8] bg-white px-3 py-2 text-sm font-bold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}

export function PortalShell({
  children,
  navItems,
  title,
  eyebrow,
  userName,
  userRole,
  homeHref,
  portal,
}: {
  children: ReactNode;
  navItems: NavItem[];
  title: string;
  eyebrow: string;
  userName: string;
  userRole: string;
  homeHref: string;
  portal: "admin" | "tenant" | "landlord";
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const initials = userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) setDrawerOpen(false);
    }
    if (drawerOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [drawerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const accentByPortal: Record<string, string> = {
    tenant: "bg-[#145F6B]",
    landlord: "bg-[#181918]",
    admin: "bg-[#145F6B]",
  };
  const accent = accentByPortal[portal] ?? "bg-[#145F6B]";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Desktop sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#C5F0F8] bg-white shadow-sm lg:flex">
        {/* Brand */}
        <Link href={homeHref} className="flex flex-col items-start border-b border-[#C5F0F8] px-4 py-4">
          <Image
            src="/logos/glamandi-logo-cropped.png"
            alt="Glamandi Homes"
            width={160}
            height={98}
            className="h-11 w-auto object-contain"
            priority
          />
          <span className={cn("mt-2 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-white", accent)}>{portal} portal</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-0.5">
            {navItems.map((item) => <NavLink key={item.href} item={item} />)}
          </div>
        </nav>

        {/* User footer */}
        <div className="border-t border-[#C5F0F8] p-3">
          <div className="flex items-center gap-3">
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white", accent)}>
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-[#145F6B]">{userName}</p>
              <p className="truncate text-[10px] text-slate-500">{userRole}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ── Mobile drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div ref={drawerRef} className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-[#C5F0F8] px-4 py-3">
              <Link href={homeHref} onClick={() => setDrawerOpen(false)}>
                <Image
                  src="/logos/glamandi-logo-cropped.png"
                  alt="Glamandi Homes"
                  width={130}
                  height={80}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Nav list */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-0.5">
                {navItems.map((item) => <NavLink key={item.href} item={item} onClick={() => setDrawerOpen(false)} />)}
              </div>
            </nav>

            {/* User footer */}
            <div className="border-t border-[#C5F0F8] p-3">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white", accent)}>
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#145F6B]">{userName}</p>
                  <p className="truncate text-[10px] text-slate-500">{userRole}</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main area ── */}
      <div className="lg:pl-64">
        {/* Sticky top bar */}
        <header className="sticky top-0 z-30 border-b border-[#C5F0F8] bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-xl border border-[#C5F0F8] bg-white p-2.5 text-[#145F6B] shadow-sm lg:hidden"
              aria-label="Open navigation"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            {/* Portal label (desktop only — sidebar shows it on mobile) */}
            <div className="hidden flex-1 lg:block">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#3AC4FA]">{portal} portal</p>
              <p className="text-sm font-black text-[#145F6B]">{title}</p>
            </div>

            {/* Mobile: show portal name inline */}
            <p className="flex-1 text-sm font-black text-[#145F6B] lg:hidden">{title}</p>

            {/* Right: user chip + logout on mobile */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-[#C5F0F8] bg-white px-3 py-1.5 sm:flex">
                <div className={cn("flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-black text-white", accent)}>{initials}</div>
                <span className="text-sm font-bold text-[#145F6B]">{userName}</span>
              </div>
              <div className="lg:hidden">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
