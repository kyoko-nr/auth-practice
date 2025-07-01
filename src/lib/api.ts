// src/lib/api.ts
import { getIdToken } from './authHelper';

const API_BASE = 'https://your-backend.example.com/api';

type FetchOptions = Omit<RequestInit, 'headers' | 'body'> & {
  body?: any;
};

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `API Error ${res.status} ${res.statusText}: ${text}`
    );
  }
  return (await res.json()) as T;
}
