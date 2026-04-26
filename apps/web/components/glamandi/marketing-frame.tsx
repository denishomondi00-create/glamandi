import Link from "next/link";
import type { ReactNode } from "react";
import { GlamandiLogo, GradientButton } from "./page-kit";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Properties", "/properties"],
  ["Contact", "/contact"],
];

export function MarketingFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0FBFF] text-[#181918]">
      <header className="sticky top-0 z-50 border-b border-[#C5F0F8]/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <GlamandiLogo />
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-[#F0FBFF] hover:text-[#145F6B]">
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="text-sm font-black text-[#145F6B]">Portal Login</Link>
            <GradientButton href="/contact" label="Book Viewing" />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#C5F0F8]/80 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <GlamandiLogo />
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              We turn houses into homes through professional property management, transparent rent operations, tenant support, landlord reporting, and digital-first service.
            </p>
          </div>
          <div>
            <h4 className="font-black text-[#145F6B]">Company</h4>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <Link href="/about">About Glamandi</Link>
              <Link href="/services">Services</Link>
              <Link href="/properties">Available Properties</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[#145F6B]">Portals</h4>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <Link href="/login">Tenant Login</Link>
              <Link href="/login">Landlord Login</Link>
              <Link href="/admin">Staff Control Center</Link>
              <Link href="/offline">Offline Support</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#C5F0F8]/80 py-4 text-center text-xs font-semibold text-slate-500">
          © {new Date().getFullYear()} Glamandi Homes. Built for rent truth, not spreadsheet mythology.
        </div>
      </footer>
    </div>
  );
}
