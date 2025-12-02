import { Message, Room } from "@/state/chat/types";
import api from "../axios";

export const getMessages = async (roomName: string): Promise<Message[]> => {
  const res = await api.get<Message[]>(`chat/${roomName}/messages/`);

  return res.data;
};
