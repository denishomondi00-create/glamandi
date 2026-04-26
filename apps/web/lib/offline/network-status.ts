export function isBrowserOnline() {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

export function subscribeToNetworkStatus(callback: (online: boolean) => void) {
  if (typeof window === "undefined") return () => undefined;
  const onOnline = () => callback(true);
  const onOffline = () => callback(false);
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
}
