import { useEffect, useRef } from "react";
import { useSocket } from "./useSocket";
import type { WSMessage } from "./schema";

interface UsePatientPrintSocketProps {
  wsUrl: string;
  patientId: string | undefined;
  onSubmit: () => void;
}

export const usePatientPrintSocket = ({
  wsUrl,
  patientId,
  onSubmit,
}: UsePatientPrintSocketProps) => {
  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);
  const lastProcessedRef = useRef<WSMessage | null>(null);

  useEffect(() => {
    if (!lastMessage || !patientId) return;
    if (lastProcessedRef.current === lastMessage) return;

    lastProcessedRef.current = lastMessage;

    const { type, payload } = lastMessage;

    if (type === "submit_patient" && payload?._id === patientId) {
      onSubmit();
    }
  }, [lastMessage, patientId, onSubmit]);
};