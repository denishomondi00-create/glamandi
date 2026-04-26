import { fetchJson } from "./fetcher";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/proxy";

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

type ApiEnvelope<T> = { success: boolean; data: T; requestId?: string; timestamp?: string };

async function callApi<T>(url: string, init: RequestInit): Promise<T> {
  const raw = await fetchJson<unknown>(url, init);
  if (raw && typeof raw === "object" && "success" in raw && "data" in raw) {
    return (raw as ApiEnvelope<T>).data;
  }
  return raw as T;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) =>
    callApi<T>(buildUrl(path), { ...init, method: "GET", credentials: "include" }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    callApi<T>(buildUrl(path), { ...init, method: "POST", body: body instanceof FormData ? body : JSON.stringify(body ?? {}), credentials: "include" }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    callApi<T>(buildUrl(path), { ...init, method: "PATCH", body: JSON.stringify(body ?? {}), credentials: "include" }),
  delete: <T>(path: string, init?: RequestInit) =>
    callApi<T>(buildUrl(path), { ...init, method: "DELETE", credentials: "include" }),
};
