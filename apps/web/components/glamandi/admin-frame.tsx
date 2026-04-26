"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/formatters";

const navGroups = [
  {
    label: "Core",
    links: [
      { label: "Dashboard", href: "/admin" },
      { label: "Properties", href: "/admin/properties" },
      { label: "Units", href: "/admin/units" },
      { label: "Tenants", href: "/admin/tenants" },
      { label: "Landlords", href: "/admin/landlords" },
      { label: "Tenancies", href: "/admin/tenancies" },
    ],
  },
  {
    label: "Finance",
    links: [
      { label: "Charges", href: "/admin/charges" },
      { label: "Payments", href: "/admin/payments" },
      { label: "Receipts", href: "/admin/receipts" },
      { label: "Penalties", href: "/admin/penalties" },
      { label: "Deposits", href: "/admin/deposits" },
      { label: "Statements", href: "/admin/statements" },
      { label: "Payouts", href: "/admin/payouts" },
    ],
  },
  {
    label: "Operations",
    links: [
      { label: "Utilities", href: "/admin/utilities" },
      { label: "Repairs", href: "/admin/repairs" },
      { label: "Inquiries", href: "/admin/inquiries" },
      { label: "Offline Sync", href: "/admin/offline-sync" },
      { label: "Website", href: "/admin/website" },
      { label: "Reports", href: "/admin/reports" },
    ],
  },
  {
    label: "System",
    links: [
      { label: "Users", href: "/admin/users" },
      { label: "Roles", href: "/admin/roles" },
      { label: "Audit Log", href: "/admin/audit" },
      { label: "Settings", href: "/admin/settings" },
    ],
  },
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/admin" && pathname.startsWith(href + "/")) || (href === "/admin" && pathname === "/admin");
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
        active
          ? "bg-[#145F6B] text-white shadow-sm"
          : "text-slate-600 hover:bg-[#F0FBFF] hover:text-[#145F6B]",
      )}
    >
      {label}
    </Link>
  );
}

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/admin">
          <Image
            src="/logos/glamandi-logo-cropped.png"
            alt="Glamandi Homes"
            width={160}
            height={98}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>
        <span className="rounded-full bg-[#145F6B]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-[#145F6B]">Admin</span>
      </div>

      {/* Quick actions */}
      <div className="px-3 pb-3">
        <Link
          href="/admin/payments/new"
          onClick={onNavClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#145F6B] px-3 py-2.5 text-sm font-black text-white hover:bg-[#145F6B]/90"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Record Payment
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#3AC4FA]">{group.label}</p>
            <div className="space-y-0.5">
              {group.links.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} onClick={onNavClick} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    document.cookie = "glamandi_access_token=; max-age=0; path=/";
    document.cookie = "glamandi_refresh_token=; max-age=0; path=/";
    document.cookie = "glamandi_role=; max-age=0; path=/";
    router.push("/login");
  }
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-xl border border-[#C5F0F8] bg-white px-3 py-2 text-sm font-bold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}

export function AdminFrame({
  children,
  userName = "Admin",
  userEmail = "",
}: {
  children: ReactNode;
  userName?: string;
  userEmail?: string;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [drawerOpen]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const initials = userName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Desktop sidebar ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#C5F0F8] bg-white shadow-sm lg:block">
        <SidebarContent />
        {/* User + logout at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#C5F0F8] bg-white p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#145F6B]/10 text-sm font-black text-[#145F6B]">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-[#145F6B]">{userName}</p>
              {userEmail && <p className="truncate text-[10px] text-slate-500">{userEmail}</p>}
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div ref={drawerRef} className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#C5F0F8] px-4 py-3">
              <Image
                src="/logos/glamandi-logo-cropped.png"
                alt="Glamandi Homes"
                width={130}
                height={80}
                className="h-9 w-auto object-contain"
              />
              <button onClick={() => setDrawerOpen(false)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SidebarContent onNavClick={() => setDrawerOpen(false)} />
            </div>
            <div className="border-t border-[#C5F0F8] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#145F6B]/10 text-sm font-black text-[#145F6B]">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#145F6B]">{userName}</p>
                  <p className="truncate text-[10px] text-slate-500">Admin</p>
                </div>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Top header ── */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-[#C5F0F8] bg-white/95 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-xl border border-[#C5F0F8] bg-white p-2.5 text-[#145F6B] shadow-sm lg:hidden"
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <PageTitle />
            </div>

            {/* Right actions */}
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/admin/payments/new"
                className="hidden items-center gap-1.5 rounded-xl bg-[#145F6B] px-4 py-2 text-sm font-black text-white hover:bg-[#145F6B]/90 sm:flex"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Payment
              </Link>
              {/* Desktop logout hidden here — it's in sidebar */}
              <div className="lg:hidden">
                <LogoutButton />
              </div>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

// Reads the current pathname and shows a human-readable page title in the header
function PageTitle() {
  const pathname = usePathname();
  const segments = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const label = segments.length === 0
    ? "Dashboard"
    : segments.map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())).join(" › ");
  return <p className="truncate text-sm font-black text-[#145F6B]">{label || "Dashboard"}</p>;
}
