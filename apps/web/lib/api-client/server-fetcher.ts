import { cookies } from "next/headers";
import { fetchJson } from "./fetcher";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export const serverApi = {
  async get<T>(path: string, init?: RequestInit) {
    const cookieStore = await cookies();
    const token = cookieStore.get("glamandi_access_token")?.value;
    return fetchJson<T>(buildUrl(path), { ...init, method: "GET", token });
  },
};
