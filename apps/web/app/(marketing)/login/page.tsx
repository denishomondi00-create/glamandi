import type { Metadata } from "next";
import { LoginPage } from "@/components/glamandi/marketing-pages";

export const metadata: Metadata = { title: "Glamandi Portal Login | Glamandi Homes" };

export default function Page() {
  return <LoginPage  />;
}
