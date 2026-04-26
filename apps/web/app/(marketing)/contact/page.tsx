import type { Metadata } from "next";
import { ContactPageContent } from "@/components/glamandi/contact-page";

export const metadata: Metadata = {
  title: "Contact Glamandi Homes | Get in Touch",
  description: "Send a viewing request, tenant inquiry, landlord onboarding request, or general message to Glamandi Homes. Based in Mtwapa, Kilifi County, Kenya.",
};

export default function Page() {
  return <ContactPageContent />;
}
