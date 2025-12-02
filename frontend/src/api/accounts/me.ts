import { User } from "@/state/accounts";
import api from "../axios";

export const getCurrentUser = async (): Promise<User> => {
  const res = await api.get<User>("/accounts/me/");
  return res.data;
};
