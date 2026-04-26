import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Landlord Command Center | Landlord Portal | Glamandi Homes",
  description: "Owned properties, occupancy, statement summaries, payout history, repairs, deductions, and documents.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("dashboard");
  return <LandlordSectionPage data={data} />;
}
