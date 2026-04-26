import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/portal-shell";
import { landlordNavItems } from "@/components/nav/landlord-nav";
import { getCurrentSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Landlord Portal | Glamandi Homes",
  description: "Landlord properties, occupancy, statements, payouts, repairs, deductions, documents, and profile portal for Glamandi Homes.",
};

export default async function LandlordLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentSession();

  return (
    <PortalShell
      portal="landlord"
      title="Landlord Portal"
      eyebrow="Glamandi Homes"
      navItems={landlordNavItems}
      userName={session?.user?.name ?? "Landlord"}
      userRole="Landlord"
      homeHref="/landlord"
    >
      {children}
    </PortalShell>
  );
}
