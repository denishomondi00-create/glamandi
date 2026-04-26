"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/formatters";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} className={cn("rounded-full px-4 py-2 text-sm font-black", active ? "bg-[#17DEFE]/15 text-[#145F6B]" : "text-slate-600 hover:text-[#145F6B]")}>{children}</Link>
  );
}
