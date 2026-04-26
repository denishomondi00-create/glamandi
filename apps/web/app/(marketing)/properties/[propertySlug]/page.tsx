import type { Metadata } from "next";
import { PropertyDetailPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Property Detail | Glamandi Homes" };

export default function Page({ params }: { params: { propertySlug: string } }) {
  return <PropertyDetailPage slug={params.propertySlug} />;
}
