import api from "../axios";

export interface CheckUserResponse {
  exists: boolean;
}

export const checkUserName = async (
  username: string
): Promise<CheckUserResponse> => {
  const res = await api.post<CheckUserResponse>("/accounts/check-user/", {
    username,
  });
  return res.data;
};
