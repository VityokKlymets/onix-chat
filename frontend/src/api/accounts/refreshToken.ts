import api from "../axios";

interface RefreshTokenResponse {
  access: string;
}

export const refreshToken = async (
  refresh: string
): Promise<RefreshTokenResponse> => {
  const res = await api.post<RefreshTokenResponse>("/token/refresh/", {
    refresh,
  });
  return res.data;
};
