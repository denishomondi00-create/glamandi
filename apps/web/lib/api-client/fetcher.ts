import { parseApiResponse } from "./response";

export type FetcherOptions = RequestInit & { token?: string | null };

export async function fetchJson<T>(url: string, options: FetcherOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("accept", "application/json");
  if (options.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  if (options.token) headers.set("authorization", `Bearer ${options.token}`);

  const response = await fetch(url, { ...options, headers });
  return parseApiResponse<T>(response);
}
