import { create } from "zustand";
import type { AuthUser } from "./types";

const TOKEN_KEY = "token";
const USER_KEY = "user";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isHydrated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  hydrate: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isHydrated: false,

  setAuth: (user, token) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ user: null, token: null });
  },

  hydrate: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);

    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw) as AuthUser;
        set({ user, token, isHydrated: true });
        return;
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    set({ user: null, token: null, isHydrated: true });
  },

  isAuthenticated: () => Boolean(get().token),
}));

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
