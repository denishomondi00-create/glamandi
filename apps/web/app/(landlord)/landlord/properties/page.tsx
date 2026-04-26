import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Properties | Landlord Portal | Glamandi Homes",
  description: "Properties owned, published listing status, occupancy snapshot, and location summaries.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("properties");
  return <LandlordSectionPage data={data} />;
}
