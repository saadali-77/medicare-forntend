import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../Api/auth.api";
import { useAuth } from "./useAuth";

export const useCurrentUser = () => {
  const { user, accessToken } = useAuth();

  return useQuery({
    queryKey: ["auth", "me", user?.email],
    queryFn: getCurrentUser,
    enabled: Boolean(accessToken),
  });
};
