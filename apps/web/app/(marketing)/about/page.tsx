import type { Metadata } from "next";
import { MarketingContentPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "About Glamandi Homes | Glamandi Homes" };

const page = { title: "About Glamandi Homes", eyebrow: "About", description: "Glamandi Homes exists to turn houses into homes through organized property management, tenant care, landlord transparency, and digital systems that reduce confusion.", panels: [ { title: "Our promise", description: "Clear rent records, responsive support, responsible maintenance, and professional communication.", items: ["Tenant support", "Landlord trust", "Operational clarity"] }, { title: "Our system", description: "The public website connects to Glamandi Control Center so listings, inquiries, and portals share one source of truth.", items: ["Website listings", "Tenant portal", "Landlord portal"] }, { title: "Our standard", description: "Property management should not depend on scattered chats and memory. A shocking innovation, apparently.", items: ["Receipts", "Statements", "Audit trails"] } ] };

export default function Page() {
  return <MarketingContentPage {...page} />;
}
