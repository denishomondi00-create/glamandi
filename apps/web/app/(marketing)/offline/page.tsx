import type { Metadata } from "next";
import { OfflinePage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Glamandi Offline Mode | Glamandi Homes" };

export default function Page() {
  return <OfflinePage  />;
}
