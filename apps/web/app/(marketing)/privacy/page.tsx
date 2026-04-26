import type { Metadata } from "next";
import { LegalPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Privacy Policy | Glamandi Homes" };

const page = { title: "Privacy Policy", description: "How Glamandi Homes handles tenant, landlord, inquiry, payment, document, and portal data across the website and Control Center." };

export default function Page() {
  return <LegalPage {...page} />;
}
