import type { Metadata } from "next";
import { MarketingContentPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Glamandi Services | Glamandi Homes" };

const page = { title: "Property management services built for real operations.", eyebrow: "Services", description: "Glamandi manages rentals through structured rent collection, tenant support, landlord statements, repairs, listings, inquiries, and digital reporting.", panels: [ { title: "Tenant management", description: "Move-ins, notices, balances, deposits, penalties, utilities, receipts, and repair requests.", items: ["Onboarding", "Statements", "Support"] }, { title: "Landlord management", description: "Occupancy, collections, commission, repair deductions, monthly statements, and payout history.", items: ["Payouts", "Deductions", "Reports"] }, { title: "Digital operations", description: "Website listings, CRM inquiries, offline drafts, payment reconciliation, and audit logs.", items: ["Listings", "Inquiries", "Offline sync"] } ] };

export default function Page() {
  return <MarketingContentPage {...page} />;
}
