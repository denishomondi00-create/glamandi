import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "glamandi-web",
    publicFace: "Glamandi Homes",
    privateFace: "Glamandi Control Center",
    timestamp: new Date().toISOString(),
  });
}
