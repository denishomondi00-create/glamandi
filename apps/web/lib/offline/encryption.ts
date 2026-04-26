export async function hashOfflineValue(value: string) {
  if (typeof crypto === "undefined" || !crypto.subtle) return value;
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
