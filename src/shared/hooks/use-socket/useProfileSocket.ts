import { useEffect } from "react";
import { useSharedSocket } from "./useSharedSocket";

interface UseProfileSocketProps {
  userId?: string;
  onInactive: () => void;
}

export const useProfileSocket = ({
  userId,
  onInactive,
}: UseProfileSocketProps) => {
  const { lastMessage } = useSharedSocket();

  useEffect(() => {
    if (!lastMessage) return;
    if (
      lastMessage.type === "update_user" &&
      lastMessage.payload._id === userId
    ) {
      onInactive();
    }
  }, [lastMessage, userId, onInactive]);
};
