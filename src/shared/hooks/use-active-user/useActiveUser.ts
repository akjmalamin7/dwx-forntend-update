import { useEffect } from "react";
import { useGetProfile } from "../use-get-profile/useGetProfile";
import type { WSMessage } from "../use-socket/schema";
import { useSocket } from "../use-socket/useSocket";

export const useActiveUser = () => {
  const { status,email, refetch, profileData } = useGetProfile();
  const { lastMessage } = useSocket<WSMessage>(
    import.meta.env.VITE_WS_URL,
    5000,
  );

  useEffect(() => {
    if (!lastMessage) return;
    const { type } = lastMessage;
    if (type === "update_user") {
      refetch();
    }
  }, [lastMessage, refetch, profileData?.status]);

  return {
    status,
    email,
  };
};
