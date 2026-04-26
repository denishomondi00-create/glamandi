"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/formatters";

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition",
              active ? "bg-[#17DEFE]/15 text-[#145F6B] ring-1 ring-[#17DEFE]/30" : "text-slate-600 hover:bg-[#C5F0F8]/35 hover:text-[#145F6B]",
            )}
          >
            <span>{item.label}</span>
            {item.badge ? <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-[#3AC4FA]">{item.badge}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
