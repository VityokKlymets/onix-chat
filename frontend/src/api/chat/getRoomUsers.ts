import api from "../axios";
import { User } from "@/state/accounts";

export const getRoomUsers = async (roomName: string): Promise<User[]> => {
  const res = await api.get<User[]>(`chat/${roomName}/users/`);

  return res.data;
};
