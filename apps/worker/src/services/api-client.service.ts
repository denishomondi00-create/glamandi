import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiClientService {
  private readonly baseUrl = (process.env.API_URL ?? 'http://localhost:4000/api/v1').replace(/\/$/, '');
  private readonly workerSecret = process.env.WORKER_SECRET;

  async get<T>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PATCH', path, body);
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'content-type': 'application/json',
        ...(this.workerSecret ? { 'x-worker-secret': this.workerSecret } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API ${method} ${path} failed: ${response.status} ${text}`);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }
}
