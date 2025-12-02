import { Room } from "@/state/chat/types";
import api from "../axios";

export const getRooms = async (): Promise<Room[]> => {
  const res = await api.get<Room[]>("/chat/rooms/");

  return res.data;
};
