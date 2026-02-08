import { apiFetch } from "./client.ts";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token: string;
  token_type?: string;
};

export type RefreshRequest = {
  refresh_token: string;
};

export type AuthSession = Record<string, unknown>;

export type LogoutResponse = Record<string, unknown>;

export async function login(request: LoginRequest): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/accounts/auth/login", {
    method: "POST",
    body: request,
  });
}

export async function fetchSession(): Promise<AuthSession> {
  return apiFetch<AuthSession>("/accounts/auth/me");
}

export async function refreshSession(
  request: RefreshRequest,
): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/accounts/auth/refresh", {
    method: "POST",
    body: request,
  });
}

export async function logoutSession(): Promise<LogoutResponse> {
  return apiFetch<LogoutResponse>("/accounts/auth/logout", {
    method: "POST",
  });
}
