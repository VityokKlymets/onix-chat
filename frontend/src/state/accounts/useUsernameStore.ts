import { AccountsAPI } from "@/api";
import { create } from "zustand";
import { notifyIfString, parseAxiosError } from "../utils";

interface UsernameState {
  exists: boolean | undefined;
  error: string | Record<string, string[]> | null;
  username: string;
  checkUserName: (username: string) => Promise<void>;
  setUserPassword: (password: string, passwordConfirm: string) => Promise<void>;
  reset: () => void;
}

export const useUsernameStore = create<UsernameState>((set) => ({
  exists: undefined,
  error: null,
  username: "",

  async checkUserName(username) {
    try {
      set({ error: null });

      const data = await AccountsAPI.checkUserName(username);
      set({ exists: data.exists, error: null, username });
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      notifyIfString(message);
      set({ error: message });
    }
  },

  async setUserPassword(password, passwordConfirm) {
    try {
      set({ error: null });

      const username = useUsernameStore.getState().username;

      await AccountsAPI.setUserPassword(username, password, passwordConfirm);
      set({ error: null, exists: true });
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      notifyIfString(message);
      set({ error: message });
    }
  },
  reset: () => set({ username: "", exists: undefined, error: null }),
}));
