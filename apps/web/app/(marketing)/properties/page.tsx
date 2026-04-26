import type { Metadata } from "next";
import { PropertiesPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Available Properties | Glamandi Homes" };

export default function Page() {
  return <PropertiesPage  />;
}
