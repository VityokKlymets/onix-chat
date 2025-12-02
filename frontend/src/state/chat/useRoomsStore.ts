import { create } from "zustand";
import { Room } from "./types";
import { ChatApi } from "@/api/chat";
import { notifyIfString, parseAxiosError } from "../utils";

interface RoomsState {
  rooms: Room[];
  selectedRoom: Room | null;
  loading: boolean;
  error: string | Record<string, string[]> | null;

  fetchRooms: () => Promise<void>;
  selectRoom: (room: Room) => void;
  setUnread: (roomId: Room["id"], unread: number) => void;
  reset: () => void;
}

export const useRoomsStore = create<RoomsState>((set) => ({
  rooms: [],
  selectedRoom: null,
  loading: false,
  error: null,

  fetchRooms: async () => {
    set({ loading: true, error: null });
    try {
      const rooms = await ChatApi.getRooms();
      set({ rooms, loading: false });
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      notifyIfString(message);
      set({ error: message, loading: false });
    }
  },

  selectRoom: (room) => {
    set({ selectedRoom: room });
  },

  setUnread: (roomId, unread) => {
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === roomId ? { ...r, unread } : r)),
    }));
  },
  reset: () => {
    set({ rooms: [], selectedRoom: null, loading: false, error: null });
  },
}));
