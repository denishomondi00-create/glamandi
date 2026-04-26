import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MarketingFrame } from "@/components/glamandi/marketing-frame";

export const metadata: Metadata = {
  title: "Glamandi Homes | We turn houses into homes",
  description: "Glamandi Homes public website, tenant portal, landlord portal, and property management operating system entry point.",
};

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <MarketingFrame>{children}</MarketingFrame>;
}
