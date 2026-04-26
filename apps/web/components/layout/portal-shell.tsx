import type { ReactNode } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/website/logo-mark";
import { SidebarNav, type NavItem } from "@/components/nav/sidebar-nav";
import { MobileNav } from "@/components/nav/mobile-nav";
import { SyncStatusBadge } from "@/components/offline/sync-status-badge";

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
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_1fr]">
      <aside className="hidden border-r border-[#C5F0F8]/80 bg-white/90 p-5 shadow-xl shadow-[#145F6B]/5 backdrop-blur lg:block">
        <Link href={homeHref} className="mb-8 flex items-center gap-3">
          <LogoMark />
          <span>
            <span className="block text-xs font-black uppercase tracking-[0.24em] text-[#3AC4FA]">{eyebrow}</span>
            <span className="block text-lg font-black text-[#145F6B]">{title}</span>
          </span>
        </Link>
        <SidebarNav items={navItems} />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-[#C5F0F8]/80 bg-white/85 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <LogoMark compact />
              <MobileNav items={navItems} title={title} />
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#3AC4FA]">{portal} portal</p>
              <h1 className="text-xl font-black text-[#145F6B]">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <SyncStatusBadge />
              <div className="rounded-2xl border border-[#C5F0F8] bg-white px-4 py-2 text-right shadow-sm">
                <p className="text-sm font-black text-[#145F6B]">{userName}</p>
                <p className="text-xs font-bold text-[#3AC4FA]">{userRole}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
