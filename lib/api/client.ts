const API_BASE_URL = "http://127.0.0.1:8000";
const API_USER_ID = "1";
const API_LICENSE_KEY = "";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiFetch<T>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-User-Id": API_USER_ID,
    ...options.headers,
  };

  if (API_LICENSE_KEY) {
    headers["X-License-Key"] = API_LICENSE_KEY;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
