import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    offlineSyncEnabled: process.env.NEXT_PUBLIC_OFFLINE_ENABLED !== "false",
    maxCacheDays: Number(process.env.OFFLINE_MAX_CACHE_DAYS ?? 14),
    maxMutationAgeDays: Number(process.env.OFFLINE_MAX_MUTATION_AGE_DAYS ?? 7),
    sourceOfTruth: "MongoDB",
    localCache: "IndexedDB temporary working copy",
    serverTime: new Date().toISOString(),
  });
}
