import type { ADMIN_COMPLETED_PATIENTS_MODEL } from "@/shared/redux/features/admin/completed-patients/completedPatients.types";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import { useEffect, useMemo, useRef, useState } from "react";
import type { WSMessage } from "./schema";
import { useSocket } from "./useSocket";

interface UseAdminCompletedSocketProps {
  wsUrl: string;
  page: number;
  apiPatients?: ADMIN_COMPLETED_PATIENTS_MODEL[];
}
export const useAdminCompletedSocket = ({
  wsUrl,
  page,
  apiPatients,
}: UseAdminCompletedSocketProps) => {
  const [realtimePatients, setRealtimePatients] = useState<
    ADMIN_COMPLETED_PATIENTS_MODEL[]
  >([]);
  const [deletedPatientIds, setDeletedPatientIds] = useState<Set<string>>(
    new Set()
  );

  const lastProcessedRef = useRef<WSMessage | null>(null);
  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);
  const normalizeCompletedPatient = (
    payload: ADMIN_PENDING_PATIENT_MODEL
  ): ADMIN_COMPLETED_PATIENTS_MODEL => {
    return {
      ...payload,
      status: "completed",

      completed_dr: Array.isArray(payload.completed_dr)
        ? payload.completed_dr[0] ?? null
        : payload.completed_dr,

      completed_time: payload.completed_time ?? new Date().toISOString(),
    } as ADMIN_COMPLETED_PATIENTS_MODEL;
  };
  const toCompleted = (
    payload: ADMIN_PENDING_PATIENT_MODEL
  ): ADMIN_COMPLETED_PATIENTS_MODEL => ({
    ...payload,
    status: "completed",
    completed_dr: Array.isArray(payload.completed_dr)
      ? payload.completed_dr[0] ?? null
      : payload.completed_dr,
  });

  useEffect(() => {
    if (!lastMessage || !lastMessage.payload?._id) return;

    if (lastProcessedRef.current === lastMessage) return;
    lastProcessedRef.current = lastMessage;

    const { type, payload } = lastMessage;

    switch (type) {
      case "submit_patient": {
        setDeletedPatientIds((prev) => {
          const updated = new Set(prev);
          updated.delete(payload._id);
          return updated;
        });

        if (page === 1) {
          setRealtimePatients((prev) =>
            prev.some((p) => p._id === payload._id)
              ? prev.map((p) => (p._id === payload._id ? payload : p))
              : [payload, ...prev]
          );
        }
        break;
      }
      case "update_print_status": {
        setRealtimePatients((prev) => {
          const exists = prev.some((p) => p._id === payload._id);

          if (exists) {
            return prev.map((p) =>
              p._id === payload._id
                ? {
                    ...p,
                    printstatus: payload.printstatus,
                    lastUpdated: Date.now(),
                  }
                : p
            );
          }

          const inApiData = apiPatients?.some((p) => p._id === payload._id);

          if (inApiData) {
            const completed = normalizeCompletedPatient(
              payload as ADMIN_PENDING_PATIENT_MODEL
            );

            return [
              ...prev,
              {
                ...completed,
                lastUpdated: Date.now(),
              },
            ];
          }

          return prev;
        });
        break;
      }

      case "delete_patient":
      case "patient_deleted": {
        setDeletedPatientIds((prev) => new Set(prev).add(payload._id));
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        break;
      }

      case "completed_back": {
        setDeletedPatientIds((prev) => new Set(prev).add(payload._id));
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        break;
      }
      case 'update_print_status':
      case "update_patient": {
        if (payload.status !== "completed") break;

        const completed = toCompleted(payload as ADMIN_PENDING_PATIENT_MODEL);

        setRealtimePatients((prev) => {
          const exists = prev.some((p) => p._id === completed._id);

          if (exists) {
            return prev.map((p) =>
              p._id === completed._id
                ? { ...p, ...completed, lastUpdated: Date.now() }
                : p
            );
          }

          if (page === 1) {
            return [{ ...completed, lastUpdated: Date.now() }, ...prev];
          }

          return prev;
        });
        break;
      }

      default:
    }
  }, [lastMessage, page, apiPatients]);
  const mergedPatientData = useMemo(() => {
    const apiData = apiPatients || [];

    // Filter out deleted/removed patients
    const filteredApiData = apiData.filter(
      (p) => !deletedPatientIds.has(p._id)
    );

    // Create map of realtime updates
    const realtimeMap = new Map(realtimePatients.map((p) => [p._id, p]));

    // Smart merge: prefer realtime data but preserve populated fields from API
    const merged = filteredApiData.map((apiPatient) => {
      const realtimeUpdate = realtimeMap.get(apiPatient._id);

      if (!realtimeUpdate) {
        return apiPatient;
      }

      // Check if completed_dr is unpopulated (string instead of object)
      const isCompletedDrUnpopulated =
        realtimeUpdate.completed_dr &&
        typeof realtimeUpdate.completed_dr === "string";

      // Check if agent_id is unpopulated
      const isAgentIdUnpopulated =
        realtimeUpdate.agent_id && typeof realtimeUpdate.agent_id === "string";

      // Merge: use realtime data but preserve populated fields
      return {
        ...realtimeUpdate,
        completed_dr: isCompletedDrUnpopulated
          ? apiPatient.completed_dr
          : realtimeUpdate.completed_dr,
        agent_id: isAgentIdUnpopulated
          ? apiPatient.agent_id
          : realtimeUpdate.agent_id,
      };
    });

    // Add new patients on page 1
    if (page === 1) {
      const apiIds = new Set(filteredApiData.map((p) => p._id));
      const newPatients = realtimePatients.filter((p) => !apiIds.has(p._id));

      if (newPatients.length > 0) {
        return [...newPatients, ...merged];
      }
    }

    return merged;
  }, [apiPatients, realtimePatients, page, deletedPatientIds]);

  return {
    mergedPatientData,
    resetRealTime: () => {
      setRealtimePatients([]);
      setDeletedPatientIds(new Set());
    },
  };
};
