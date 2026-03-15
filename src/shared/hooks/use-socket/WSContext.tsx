import { createContext, useContext, type ReactNode } from "react"; 
import { useSocket } from "./useSocket";
import type { WSMessage } from "./schema";

type WSContextType = ReturnType<typeof useSocket<WSMessage>>;

const WSContext = createContext<WSContextType | null>(null);

export const WSProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket<WSMessage>(import.meta.env.VITE_WS_URL, 5000);
  return <WSContext.Provider value={socket}>{children}</WSContext.Provider>;
};

export const useSharedSocket = () => {
  const ctx = useContext(WSContext);
  if (!ctx) throw new Error("useSharedSocket must be used within WSProvider");
  return ctx;
};