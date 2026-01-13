// lib/auth-store.ts
"use client";
import { create } from "zustand";
import { api } from "./api";
import { getAuthToken, setAuthToken } from "./auth-token";

export type Role = "STUDENT" | "ADMIN" | "SUPER_ADMIN";

export interface AuthUser {
  _id: string,
  id: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;

  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  hydrate: () => void;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  setAuth: (user, token) => {
    const normalizedUser = { ...user, _id: (user as any)._id ?? (user as any).id };
    setAuthToken(token);
    set({ user:normalizedUser, token, error: null });
  },

  logout: () => {
    setAuthToken(null);
    set({ user: null, token: null });
  },

  
hydrate: async () => {
  const token = getAuthToken();
  if (!token) return;

  set({ token, loading: true });

  try {
    const res = await api.get("/auth/me", {
      headers: { "Cache-Control": "no-cache" },
    });

    // 🔒 Guard against 304 / empty response
    if (!res.data || !res.data.user) {
      throw new Error("No user data");
    }

    set({ user: res.data.user });
  } catch (err) {
    get().logout();
  } finally {
    set({ loading: false });
  }
},



  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data;
      get().setAuth(user, token);
    } catch (err: any) {
      console.error(err);
      set({
        error: err?.response?.data?.message || "Login failed",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/register", { email, password });
      const { user, token } = res.data;
      get().setAuth(user, token);
    } catch (err: any) {
      console.error(err);
      set({
        error: err?.response?.data?.message || "Registration failed",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));


