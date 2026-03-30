import { createContext, type ReactNode } from "react";
import type { WSMessage } from "./schema";
import { useSocket } from "./useSocket";

type WSContextType = ReturnType<typeof useSocket<WSMessage>>;

// eslint-disable-next-line react-refresh/only-export-components
export const WSContext = createContext<WSContextType | null>(null);

export const WSProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket<WSMessage>(import.meta.env.VITE_WS_URL, 5000);
  return <WSContext.Provider value={socket}>{children}</WSContext.Provider>;
};
