export async function requestBackgroundSync(tag = "glamandi-offline-sync") {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return false;
  const registration = await navigator.serviceWorker.ready;
  const sync = (registration as ServiceWorkerRegistration & { sync?: { register: (tag: string) => Promise<void> } }).sync;
  if (!sync) return false;
  await sync.register(tag);
  return true;
}
