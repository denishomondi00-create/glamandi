"use client";

import { useNetworkStatus } from "@/hooks/use-network-status";

export function SyncStatusBadge() {
  const online = useNetworkStatus();
  return <span className="rounded-full border border-[#C5F0F8] bg-white px-3 py-1 text-xs font-black text-[#145F6B]">{online ? "Online" : "Offline draft"}</span>;
}
