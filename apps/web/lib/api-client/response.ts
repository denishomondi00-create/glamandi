import { ApiError } from "./errors";

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json().catch(() => null) : await response.text().catch(() => null);

  if (!response.ok) {
    const message = typeof payload === "object" && payload && "message" in payload ? String((payload as { message: unknown }).message) : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}
