import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Documents | Landlord Portal | Glamandi Homes",
  description: "Landlord agreements, property documents, statements, and uploaded proofs.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("documents");
  return <LandlordSectionPage data={data} />;
}
