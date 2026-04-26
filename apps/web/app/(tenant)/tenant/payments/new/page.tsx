import type { Metadata } from "next";
import { TenantPaymentPage } from "@/features/tenants/components/tenant-payment-page";

export const metadata: Metadata = {
  title: "Make Payment | Tenant Portal | Glamandi Homes",
  description: "Pay your rent and charges via M-Pesa STK push or submit a manual M-Pesa reference.",
};

export default function Page() {
  return <TenantPaymentPage />;
}
