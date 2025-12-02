import { AccountsAPI } from "@/api";
import { create } from "zustand";
import { User } from "./types";
import { useUsernameStore } from "./useUsernameStore";
import { notifyIfString, parseAxiosError } from "../utils";
import { useChatStore, useRoomsStore } from "../chat";

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  loading: boolean;
  error: string | Record<string, string[]> | null;

  signIn: (password: string) => Promise<void>;
  signOut: () => void;
  hydrate: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  loading: false,
  error: null,

  async signIn(password) {
    try {
      set({ loading: true, error: null });

      const username = useUsernameStore.getState().username;

      const data = await AccountsAPI.signIn(username, password);

      const { user, access, refresh } = data;

      set({ user, access, refresh, loading: false });

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      notifyIfString(message);
      set({ error: message, loading: false });
    }
  },

  signOut() {
    set({ user: null, refresh: null, access: null });
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    useUsernameStore.getState().reset();
    useRoomsStore.getState().reset();
    useChatStore.getState().disconnect();
  },

  async hydrate() {
    const token = get().access;
    if (!token) return;

    try {
      set({ loading: true });
      const user = await AccountsAPI.getCurrentUser();
      set({ user, loading: false });
    } catch (err) {
      localStorage.removeItem("access");
      set({ user: null, access: null, refresh: null, loading: false });
    }
  },
  async refreshToken() {
    const refresh = get().refresh;
    if (!refresh) return null;

    try {
      const { access } = await AccountsAPI.refreshToken(refresh);

      set({ access });
      localStorage.setItem("access", access);
      return access;
    } catch (err) {
      get().signOut();
      return null;
    }
  },
}));
