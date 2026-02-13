import { API_BASE_URL } from './api';
import apiFetch from './fetcher';
import { setStoredToken } from './token';

export interface AuthUser {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

const TOKEN_KEY = 'auth_token';

export async function adminLogin(email: string, password: string) {
  const res = await apiFetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Login failed');
  }

  const payload = await res.json();
  // Persist returned token (if any)
  if (payload?.token) setStoredToken(payload.token);
  return payload;
}

export async function getCurrentUser(): Promise<{ user: AuthUser | null } > {
  const res = await apiFetch(`${API_BASE_URL}/auth/me`);
  if (!res.ok) return { user: null };
  return res.json();
}

export async function adminLogout() {
  try {
    // Ask server to clear cookie then clear local token
    try {
      await apiFetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
    } catch (_err) {
      // ignore server errors, still clear local token
    }
    setStoredToken(null);
  } catch (_e) {}
}
