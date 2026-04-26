import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    app: "Glamandi PMOS",
    cacheVersion: "glamandi-offline-v1",
    safeOfflineReads: ["dashboard", "tenants", "landlords", "properties", "units", "charges", "receipts", "settings"],
    offlineDraftOperations: [
      "CREATE_MANUAL_MPESA_PAYMENT",
      "CREATE_MANUAL_KCB_PAYMENT",
      "CREATE_CASH_PAYMENT",
      "CREATE_REPAIR_TICKET",
      "CREATE_INQUIRY",
      "CREATE_TENANT_NOTE",
      "CREATE_COMMUNICATION_EXCEPTION",
      "CREATE_UTILITY_CHARGE_DRAFT",
      "REQUEST_PENALTY_WAIVER",
    ],
    onlineOnlyOperations: [
      "PAYSTACK_CHECKOUT",
      "DARAJA_STK_PUSH",
      "OFFICIAL_RECEIPT_NUMBER_GENERATION",
      "PAYMENT_POSTING",
      "LANDLORD_PAYOUT_MARK_PAID",
      "WEBHOOK_PROCESSING",
    ],
  });
}
