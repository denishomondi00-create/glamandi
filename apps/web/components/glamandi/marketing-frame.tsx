"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Properties", href: "/properties" },
  { label: "Contact", href: "/contact" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logos/glamandi-logo-cropped.png"
        alt="Glamandi Homes"
        width={160}
        height={98}
        className="h-12 w-auto object-contain"
        priority
      />
    </Link>
  );
}

export function MarketingFrame({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F0FBFF] text-[#181918]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-[#C5F0F8]/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map(({ label, href }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${active ? "bg-[#F0FBFF] text-[#145F6B]" : "text-slate-600 hover:bg-[#F0FBFF] hover:text-[#145F6B]"}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="text-sm font-black text-[#145F6B] hover:underline">
              Portal Login
            </Link>
            <Link
              href="/contact"
              className="rounded-xl bg-[#145F6B] px-4 py-2 text-sm font-black text-white hover:bg-[#145F6B]/90 transition-colors"
            >
              Book Viewing
            </Link>
          </div>

          {/* Mobile: login + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/login" className="rounded-xl border border-[#C5F0F8] px-3 py-2 text-sm font-black text-[#145F6B] hover:bg-[#F0FBFF]">
              Login
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-xl border border-[#C5F0F8] bg-white p-2.5 text-[#145F6B]"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-[#C5F0F8] bg-white px-4 pb-4 pt-3 lg:hidden">
            <nav className="grid gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-[#F0FBFF] hover:text-[#145F6B]"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 border-t border-[#C5F0F8] pt-3">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-[#145F6B] px-4 py-3 text-sm font-black text-white"
              >
                Book a Viewing
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#C5F0F8]/80 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.7fr_0.7fr] lg:px-8">
          <div>
            <Link href="/">
              <Image
                src="/logos/glamandi-logo-cropped.png"
                alt="Glamandi Homes"
                width={400}
                height={244}
                className="h-44 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Professional property management in Kenya — transparent rent operations, tenant support, landlord reporting, and digital-first service.
            </p>
          </div>
          <div>
            <h4 className="font-black text-[#145F6B]">Company</h4>
            <div className="mt-3 grid gap-2.5 text-sm text-slate-600">
              <Link href="/about" className="hover:text-[#145F6B]">About Glamandi</Link>
              <Link href="/services" className="hover:text-[#145F6B]">Services</Link>
              <Link href="/properties" className="hover:text-[#145F6B]">Available Properties</Link>
              <Link href="/privacy" className="hover:text-[#145F6B]">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-[#145F6B]">Terms of Service</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[#145F6B]">Portals</h4>
            <div className="mt-3 grid gap-2.5 text-sm text-slate-600">
              <Link href="/login" className="hover:text-[#145F6B]">Tenant Login</Link>
              <Link href="/login" className="hover:text-[#145F6B]">Landlord Login</Link>
              <Link href="/login" className="hover:text-[#145F6B]">Staff Portal</Link>
              <Link href="/contact" className="hover:text-[#145F6B]">Contact Support</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#C5F0F8]/80 py-4 text-center text-xs font-semibold text-slate-500">
          © {new Date().getFullYear()} Glamandi Homes · Mtwapa, Kilifi County, Kenya
        </div>
      </footer>
    </div>
  );
}
