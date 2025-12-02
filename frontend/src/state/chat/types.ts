import { User } from "../accounts";

export interface Room {
  id: number;
  name: string;
  unread?: number;
}

export interface SystemMessage {
  content: string;
  system: true;
  id: string;
  event: SystemEvent;
}

export type Message =
  | {
      system: undefined;
      id: number;
      content: string;
      timestamp: string;
      user: {
        username: string;
      };
    }
  | SystemMessage;

interface NewMessageEvent {
  type: "message";
  message: Message;
}

type SystemEvent = "user_join" | "user_leave";

interface SystemMessageEvent {
  type: "chat.system";
  event: SystemEvent;
  user: User;
}

export type WebSocketEvent = NewMessageEvent | SystemMessageEvent;
