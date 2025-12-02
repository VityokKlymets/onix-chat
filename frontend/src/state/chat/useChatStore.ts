import { create } from "zustand";
import { ChatApi } from "@/api/chat";
import { User } from "../accounts";
import { Message, SystemMessage, WebSocketEvent } from "./types";

interface RoomState {
  ws: WebSocket | null;
  messages: Message[];
  connecting: boolean;
  users: User[];
}

interface ChatState {
  rooms: Record<string, RoomState>;
  currentRoom: string;
  loading: boolean;

  connect: (roomName: string) => Promise<void>;
  sendMessage: (text: string) => void;
  disconnect: (roomName?: string) => void;
  switchRoom: (roomName: string) => void;
  setMessages: (roomName: string, messages: Message[]) => void;
  fetchRoomMessages: (roomName: string) => Promise<void>;
  setUsers: (roomName: string, users: User[]) => void;
}
export const useChatStore = create<ChatState>((set, get) => ({
  rooms: {},
  currentRoom: "public",
  loading: false,

  setMessages: (roomName, messages) => {
    set((state) => ({
      rooms: {
        ...state.rooms,
        [roomName]: { ...(state.rooms[roomName] || {}), messages },
      },
    }));
  },

  fetchRoomMessages: async (roomName) => {
    try {
      set({ loading: true });
      const messages = await ChatApi.getMessages(roomName);
      const users = await ChatApi.getRoomUsers(roomName);

      get().setMessages(roomName, messages);
      get().setUsers(roomName, users);
    } catch (err) {
      console.error("Failed to fetch room messages:", err);
    }
    set({ loading: false });
  },

  connect: async (roomName) => {
    const state = get();

    const existingRoom = state.rooms[roomName];

    if (existingRoom?.ws || existingRoom?.connecting) return;

    set((state) => ({
      rooms: {
        ...state.rooms,
        [roomName]: {
          ...(state.rooms[roomName] || { messages: [], users: [] }),
          connecting: true,
        },
      },
      currentRoom: roomName,
      messages: existingRoom?.messages || [],
    }));

    const token = localStorage.getItem("access");
    if (!token) return console.warn("No access token for WebSocket");

    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_URL}/ws/chat/${roomName}/?token=${token}`
    );

    ws.onopen = () => {
      console.log(`WebSocket connected to room ${roomName}`);
      set((state) => ({
        rooms: {
          ...state.rooms,
          [roomName]: {
            ...(state.rooms[roomName] || { messages: [] }),
            ws,
          },
        },
      }));
    };

    ws.onmessage = (e) => {
      const data: WebSocketEvent = JSON.parse(e.data);
      if (data.type == "message") {
        set((state) => {
          const updatedMessages = [
            ...(state.rooms[roomName]?.messages || []),
            data.message,
          ];
          return {
            rooms: {
              ...state.rooms,
              [roomName]: {
                ...(state.rooms[roomName] || {}),
                messages: updatedMessages,
              },
            },
          };
        });
      }

      if (data.type === "chat.system") {
        console.log(data);
        if (data.event === "user_join" || data.event === "user_leave") {
          const addUser = data.event === "user_join";
          const content =
            data.event === "user_join"
              ? `${data.user.username} joined the room`
              : `${data.user.username} leaves the room`;

          set((state) => {
            const systemMessage: SystemMessage = {
              id: `sys-${Date.now()}`,
              content,
              system: true,
              event: data.event,
            };
            const updatedMessages = [
              ...(state.rooms[roomName]?.messages || []),
              systemMessage,
            ];

            const updatedUsers = addUser
              ? [...(state.rooms[roomName]?.users || []), data.user]
              : (state.rooms[roomName]?.users || []).filter(
                  (user) => user.username !== data.user.username
                );

            return {
              rooms: {
                ...state.rooms,
                [roomName]: {
                  ...(state.rooms[roomName] || {}),
                  messages: updatedMessages,
                  users: updatedUsers,
                },
              },
            };
          });
        }
      }
    };

    ws.onclose = () => {
      set((state) => ({
        rooms: {
          ...state.rooms,
          [roomName]: {
            ...(state.rooms[roomName] || { messages: [], users: [] }),
            ws: null,
            connecting: false,
          },
        },
        loading: false,
      }));
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
  },

  sendMessage: (text) => {
    const state = get();
    const ws = state.rooms[state.currentRoom]?.ws;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message: text }));
    }
  },

  disconnect: (roomName) => {
    const state = get();
    const target = roomName || state.currentRoom;
    state.rooms[target]?.ws?.close();
  },

  switchRoom: (roomName) => {
    set({
      currentRoom: roomName,
    });
    get().connect(roomName);
  },

  setUsers: (roomName, users) => {
    set((state) => ({
      rooms: {
        ...state.rooms,
        [roomName]: {
          ...(state.rooms[roomName] || { messages: [], users: [] }),
          users,
        },
      },
    }));
  },
}));
