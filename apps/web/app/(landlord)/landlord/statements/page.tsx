import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Statements | Landlord Portal | Glamandi Homes",
  description: "Monthly landlord statements, commission deductions, approved repairs, and net payable amounts.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("statements");
  return <LandlordSectionPage data={data} />;
}
