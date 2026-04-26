import { cookies } from "next/headers";
import { fetchJson } from "./fetcher";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

type ApiEnvelope<T> = { success: boolean; data: T; requestId?: string; timestamp?: string };

function unwrap<T>(result: unknown): T {
  if (result && typeof result === "object" && "success" in result && "data" in result) {
    return (result as ApiEnvelope<T>).data;
  }
  return result as T;
}

export const serverApi = {
  async get<T>(path: string, init?: RequestInit): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get("glamandi_access_token")?.value;
    const result = await fetchJson<unknown>(buildUrl(path), { ...init, method: "GET", token });
    return unwrap<T>(result);
  },

  async post<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
    const cookieStore = await cookies();
    const token = cookieStore.get("glamandi_access_token")?.value;
    const result = await fetchJson<unknown>(buildUrl(path), {
      ...init,
      method: "POST",
      body: JSON.stringify(body ?? {}),
      token,
    });
    return unwrap<T>(result);
  },
};
