import { fetchJson } from "./fetcher";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/proxy";

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) => fetchJson<T>(buildUrl(path), { ...init, method: "GET", credentials: "include" }),
  post: <T>(path: string, body?: unknown, init?: RequestInit) => fetchJson<T>(buildUrl(path), { ...init, method: "POST", body: body instanceof FormData ? body : JSON.stringify(body ?? {}), credentials: "include" }),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) => fetchJson<T>(buildUrl(path), { ...init, method: "PATCH", body: JSON.stringify(body ?? {}), credentials: "include" }),
  delete: <T>(path: string, init?: RequestInit) => fetchJson<T>(buildUrl(path), { ...init, method: "DELETE", credentials: "include" }),
};
