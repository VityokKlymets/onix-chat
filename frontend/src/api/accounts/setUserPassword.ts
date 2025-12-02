import api from "../axios";

interface SetUserPasswordResponse {}

export const setUserPassword = async (
  username: string,
  password: string,
  passwordConfirm: string
): Promise<SetUserPasswordResponse> => {
  const res = await api.post<SetUserPasswordResponse>(
    `/accounts/${username}/password/`,
    {
      username,
      password,
      password_confirm: passwordConfirm,
    }
  );
  return res.data;
};
