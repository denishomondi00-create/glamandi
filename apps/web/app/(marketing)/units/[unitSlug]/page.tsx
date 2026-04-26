import type { Metadata } from "next";
import { UnitDetailPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Unit Detail | Glamandi Homes" };

export default function Page({ params }: { params: { unitSlug: string } }) {
  return <UnitDetailPage slug={params.unitSlug} />;
}
