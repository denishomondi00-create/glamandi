import type { Metadata } from "next";
import { LegalPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Terms of Service | Glamandi Homes" };

const page = { title: "Terms of Service", description: "Terms for using Glamandi Homes website, portals, inquiry forms, property listings, and digital property management services." };

export default function Page() {
  return <LegalPage {...page} />;
}
