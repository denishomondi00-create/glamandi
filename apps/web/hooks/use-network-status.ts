"use client";

import { useEffect, useState } from "react";
import { isBrowserOnline, subscribeToNetworkStatus } from "@/lib/offline/network-status";

export function useNetworkStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    setOnline(isBrowserOnline());
    return subscribeToNetworkStatus(setOnline);
  }, []);
  return online;
}
