export const API_BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';

export function api(path: string) {
  return `${API_BASE}${path}`;
}

function getStoredTokens() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  };
}

function storeTokens(accessToken?: string | null, refreshToken?: string | null) {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  if (!accessToken) localStorage.removeItem('accessToken');
  if (!refreshToken) localStorage.removeItem('refreshToken');
}

export async function refreshAccessToken() {
  const { refreshToken } = getStoredTokens();
  if (!refreshToken) return null;
  try {
    const res = await fetch(api('/auth/refresh'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken })
    });
    if (!res.ok) {
      storeTokens(null, null);
      return null;
    }
    const body = await res.json();
    storeTokens(body.accessToken, body.refreshToken || refreshToken);
    return body.accessToken;
  } catch (err) {
    storeTokens(null, null);
    return null;
  }
}

export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
  const tokens = getStoredTokens();
  const headers = new Headers(init.headers || {});
  if (tokens.accessToken) headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  const res = await fetch(input, { ...init, headers });
  if (res.status !== 401) return res;

  // try refresh once
  const newAccess = await refreshAccessToken();
  if (!newAccess) return res;
  headers.set('Authorization', `Bearer ${newAccess}`);
  return fetch(input, { ...init, headers });
}

export function getAuthHeader() {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
