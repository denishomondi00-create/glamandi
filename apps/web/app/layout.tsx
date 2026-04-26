import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "@/components/layout/app-providers";
import { OfflineBanner } from "@/components/offline/offline-banner";
import { buildDefaultMetadata } from "@/lib/metadata/seo";

export const metadata: Metadata = buildDefaultMetadata({
  title: "Glamandi Homes | Property Management Operating System",
  description: "Glamandi Homes public website and Glamandi Control Center portals for tenants, landlords, staff, payments, receipts, repairs, offline sync, and reports.",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17DEFE",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <OfflineBanner />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
