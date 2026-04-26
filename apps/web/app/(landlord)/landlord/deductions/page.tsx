import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Deductions | Landlord Portal | Glamandi Homes",
  description: "Commission, repair deductions, withdrawals, and landlord statement adjustments.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("deductions");
  return <LandlordSectionPage data={data} />;
}
