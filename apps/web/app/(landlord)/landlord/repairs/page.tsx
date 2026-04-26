import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Repairs | Landlord Portal | Glamandi Homes",
  description: "Landlord-visible repair tickets and approved repair deductions.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("repairs");
  return <LandlordSectionPage data={data} />;
}
