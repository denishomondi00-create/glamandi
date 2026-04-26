import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Profile | Landlord Portal | Glamandi Homes",
  description: "Landlord contact details, payout preferences, document records, and account settings.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("profile");
  return <LandlordSectionPage data={data} />;
}
