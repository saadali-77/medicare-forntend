import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  login as loginAction,
  logout as logoutAction,
  setAvatar as setAvatarAction,
  type AuthUser,
} from "../store/authSlice";
import { loadAvatar, saveAvatar } from "../utils/avatarStorage";

interface LoginSession {
  user: AuthUser;
  accessToken: string;
}

export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  return {
    user,
    accessToken,
    isAuthenticated: user !== null && accessToken !== null,
    isAdmin: user?.role?.toLowerCase() === "admin",
    login: ({ user: loggedInUser, accessToken: token }: LoginSession) =>
      dispatch(
        loginAction({
          user: {
            ...loggedInUser,
            avatar: loggedInUser.avatar ?? loadAvatar(loggedInUser.email),
          },
          accessToken: token,
        }),
      ),
    logout: () => dispatch(logoutAction()),
    setAvatar: (avatar?: string) => {
      if (user) saveAvatar(user.email, avatar);
      dispatch(setAvatarAction(avatar));
    },
  };
};
