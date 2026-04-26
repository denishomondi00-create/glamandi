import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Occupancy | Landlord Portal | Glamandi Homes",
  description: "Occupied, vacant, reserved, locked, and maintenance units by property.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("occupancy");
  return <LandlordSectionPage data={data} />;
}
