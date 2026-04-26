"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavItem } from "./sidebar-nav";

export function MobileNav({ items, title }: { items: NavItem[]; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((value) => !value)} className="rounded-2xl border border-[#C5F0F8] bg-white px-4 py-2 text-sm font-black text-[#145F6B] shadow-sm">
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <div className="absolute left-0 top-12 z-50 w-72 rounded-[1.5rem] border border-[#C5F0F8] bg-white p-3 shadow-2xl">
          <p className="px-3 pb-2 text-xs font-black uppercase tracking-[0.22em] text-[#3AC4FA]">{title}</p>
          <div className="grid gap-1">
            {items.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 text-sm font-black text-slate-700 hover:bg-[#C5F0F8]/35 hover:text-[#145F6B]">{item.label}</Link>)}
          </div>
        </div>
      ) : null}
    </div>
  );
}
