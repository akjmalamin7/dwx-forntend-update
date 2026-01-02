import type { WSMessage } from "@/shared/hooks/use-socket/schema";
import { useSocket } from "@/shared/hooks/use-socket/useSocket";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import { useEffect, useMemo, useRef, useState } from "react";

interface OnlineDoctor {
  _id: string;
  email: string;
}

interface UsePendingPatientSocketProps {
  wsUrl: string;
  page: number;
  apiPatients?: ADMIN_PENDING_PATIENT_MODEL[];
  refetch: () => void;
}

export const useAdminPendingPatientSocket = ({
  wsUrl,
  page,
  apiPatients = [],
  refetch,
}: UsePendingPatientSocketProps) => {
  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);

  const [realtimePatients, setRealtimePatients] = useState<
    ADMIN_PENDING_PATIENT_MODEL[]
  >([]);
  const [onlineDoctorsMap, setOnlineDoctorsMap] = useState<
    Record<string, OnlineDoctor>
  >({});

  const lastProcessedRef = useRef<WSMessage | null>(null);

  // ===============================
  // handle socket
  // ===============================
  useEffect(() => {
    if (!lastMessage || !lastMessage.payload) return;
    if (lastProcessedRef.current === lastMessage) return;

    lastProcessedRef.current = lastMessage;
    const { type, payload } = lastMessage;

    switch (type) {
      case "new_xray_report": {
        if (page === 1) {
          setRealtimePatients((prev) =>
            prev.some((p) => p._id === payload._id) ? prev : [...prev, payload]
          );
        }
        break;
      }
      case "update_patient": {
        setRealtimePatients((prev) =>
          prev.map((p) => (p._id === payload._id ? { ...p, ...payload } : p))
        );
        if (apiPatients.some((p) => p._id === payload._id)) refetch();
        break;
      }
      case "submit_patient": {
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        setOnlineDoctorsMap((prev) => {
          const copy = { ...prev };
          delete copy[payload._id];
          return copy;
        });
        refetch();
        break;
      }
      case "view_online_doctor": {
        const dr = payload.online_dr;
        if (!dr?._id || !dr?.email) return;

        setOnlineDoctorsMap((prev) => ({
          ...prev,
          [payload._id]: { _id: dr._id, email: dr.email },
        }));

        setRealtimePatients((prev) => {
          const idx = prev.findIndex((p) => p._id === payload._id);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = payload;
            return copy;
          }
          if (apiPatients.some((p) => p._id === payload._id))
            return [...prev, payload];
          return prev;
        });
        break;
      }
      case "back_view_patient": {
        setOnlineDoctorsMap((prev) => {
          const copy = { ...prev };
          delete copy[payload._id];
          return copy;
        });
        setRealtimePatients((prev) => {
          const idx = prev.findIndex((p) => p._id === payload._id);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = {
              ...copy[idx],
              online_dr: { id: "", email: "", _id: "" },
              logged: null,
              viewed: false,
            };
            return copy;
          }
          if (apiPatients.some((p) => p._id === payload._id)) {
            return [
              ...prev,
              { ...payload, online_dr: null, logged: null, viewed: false },
            ];
          }
          return prev;
        });
        break;
      }
      case "patient_deleted": {
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        setOnlineDoctorsMap((prev) => {
          const copy = { ...prev };
          delete copy[payload._id];
          return copy;
        });
        refetch();
        break;
      }
    }
  }, [lastMessage, page, apiPatients, refetch]);

  // ===============================
  // Merge API + realtime
  // ===============================
  const mergedPatients = useMemo(() => {
    const realtimeMap = new Map(realtimePatients.map((p) => [p._id, p]));
    const merged = apiPatients.map((p) => realtimeMap.get(p._id) || p);
    if (page === 1) {
      const apiIds = new Set(apiPatients.map((p) => p._id));
      const newOnes = realtimePatients.filter((p) => !apiIds.has(p._id));
      return [...merged, ...newOnes];
    }
    return merged;
  }, [apiPatients, realtimePatients, page]);

  return {
    mergedPatients,
    onlineDoctorsMap,
    resetRealtime: () => {
      setRealtimePatients([]);
      setOnlineDoctorsMap({});
    },
  };
};
