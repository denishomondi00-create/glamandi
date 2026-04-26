import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Statement Detail | Landlord Portal | Glamandi Homes",
  description: "Detailed statement lines, rent collections, commission, repair deductions, withdrawals, and payout totals.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("statement-detail");
  return <LandlordSectionPage data={data} />;
}
