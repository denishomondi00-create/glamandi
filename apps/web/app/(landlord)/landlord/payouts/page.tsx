import type { Metadata } from "next";
import { LandlordSectionPage } from "@/features/landlords/components/landlord-section-page";
import { getLandlordPortalSection } from "@/features/landlords/server/get-landlord-portal-section";

export const metadata: Metadata = {
  title: "Payouts | Landlord Portal | Glamandi Homes",
  description: "Payout history, pending payouts, paid dates, references, and proof uploads.",
};

export default async function Page() {
  const data = await getLandlordPortalSection("payouts");
  return <LandlordSectionPage data={data} />;
}
