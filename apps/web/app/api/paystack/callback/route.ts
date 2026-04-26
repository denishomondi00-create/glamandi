import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference") ?? request.nextUrl.searchParams.get("trxref");
  const status = request.nextUrl.searchParams.get("status") ?? "pending_verification";
  const redirectTo = new URL("/tenant/payments", request.url);

  if (reference) redirectTo.searchParams.set("reference", reference);
  redirectTo.searchParams.set("paystack", status);
  redirectTo.searchParams.set("message", "Payment returned from Paystack. Server verification is required before official receipt generation.");

  return NextResponse.redirect(redirectTo);
}
