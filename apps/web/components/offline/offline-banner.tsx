"use client";

import { useNetworkStatus } from "@/hooks/use-network-status";

export function OfflineBanner() {
  const online = useNetworkStatus();
  if (online) return null;
  return (
    <div className="sticky top-0 z-[70] bg-[#145F6B] px-4 py-2 text-center text-sm font-black text-white shadow-lg">
      You are offline. Safe cached views and draft operations are available. Official financial posting waits for server sync.
    </div>
  );
}
