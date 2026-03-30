import { useContext } from "react";
import { WSContext } from "./WSContext";

export const useSharedSocket = () => {
  const ctx = useContext(WSContext);

  if (!ctx) {
    throw new Error("useSharedSocket must be used within WSProvider");
  }

  return ctx;
};
