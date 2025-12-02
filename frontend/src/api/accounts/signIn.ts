import { User } from "@/state/accounts";
import api from "../axios";

export interface SignInResponse {
  access: string;
  refresh: string;
  user: User;
}

export const signIn = async (
  username: string,
  password: string
): Promise<SignInResponse> => {
  const res = await api.post<SignInResponse>("/accounts/login/", {
    username,
    password,
  });
  return res.data;
};
