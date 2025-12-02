import { checkUserName } from "./checkUserName";
import { getCurrentUser } from "./me";
import { refreshToken } from "./refreshToken";
import { setUserPassword } from "./setUserPassword";
import { signIn } from "./signIn";

export const AccountsAPI = {
  checkUserName,
  signIn,
  setUserPassword,
  getCurrentUser,
  refreshToken,
};
