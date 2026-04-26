import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PortalShell } from "@/components/layout/portal-shell";
import { tenantNavItems } from "@/components/nav/tenant-nav";
import { getCurrentSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Tenant Portal | Glamandi Homes",
  description: "Tenant rent, receipts, penalties, utilities, repairs, notices, and profile portal for Glamandi Homes.",
};

export default async function TenantLayout({ children }: { children: ReactNode }) {
  const session = await getCurrentSession();

  return (
    <PortalShell
      portal="tenant"
      title="Tenant Portal"
      eyebrow="Glamandi Homes"
      navItems={tenantNavItems}
      userName={session?.user?.name ?? "Tenant"}
      userRole="Tenant"
      homeHref="/tenant"
    >
      {children}
    </PortalShell>
  );
}
