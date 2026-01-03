import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import type {
  AGENT_PENDING_PATIENT_MODEL,
  PENDING_DOCTOR,
} from "@/shared/redux/features/agent/pending-patient-list/pendingPatientList.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../use-auth/useAuth";
import type { WSMessage } from "./schema";
import { useSocket } from "./useSocket";

export interface OnlineDoctor {
  _id: string;
  email: string;
  id?: string;
}

interface UseAgentPendingSocketProps {
  wsUrl: string;
  page?: number;
  apiPatients?: AGENT_PENDING_PATIENT_MODEL[];
}

const emptyPendingDoctor = (): PENDING_DOCTOR => ({
  _id: "",
  email: "",
  id: "",
});

// Normalize Admin patient to Agent model
export const mapAdminToAgentPending = (
  payload: ADMIN_PENDING_PATIENT_MODEL
): AGENT_PENDING_PATIENT_MODEL =>
  ({
    _id: payload._id,
    name: payload.name,
    age: payload.age,
    rtype: payload.rtype,
    patient_id: payload.patient_id,
    agent_id: payload.agent_id,
    doctor_id: payload.doctor_id,
    completed_dr: payload.completed_dr ?? [],
    ignore_dr: payload.ignore_dr ?? [],
    online_dr: payload.online_dr
      ? {
          _id: payload.online_dr._id,
          email: payload.online_dr.email,
          id: payload.online_dr._id,
        }
      : emptyPendingDoctor(),
    status: payload.status,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
  } as AGENT_PENDING_PATIENT_MODEL);

export const useAgentPendingSocket = ({
  wsUrl,
  page = 1,
  apiPatients,
}: UseAgentPendingSocketProps) => {
  const { user } = useAuth();
  const [onlineDoctorsMap, setOnlineDoctorsMap] = useState<
    Record<string, OnlineDoctor>
  >({});
  const [realtimePatients, setRealtimePatients] = useState<
    AGENT_PENDING_PATIENT_MODEL[]
  >([]);
  const [deletedPatientIds, setDeletedPatientIds] = useState<Set<string>>(
    new Set()
  );
  const lastProcessedRef = useRef<WSMessage | null>(null);

  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);

  const isMyPatient = useCallback(
    (patient: AGENT_PENDING_PATIENT_MODEL) => {
      if (!user?.id) return false;
      const agentId = patient.agent_id?._id || patient.agent_id;
      return agentId === user.id;
    },
    [user?.id]
  );

  // ========================================
  // WebSocket Message Handler
  // ========================================
  useEffect(() => {
    if (!lastMessage || !lastMessage.payload?._id) return;
    if (lastProcessedRef.current === lastMessage) return;

    lastProcessedRef.current = lastMessage;
    let payload: AGENT_PENDING_PATIENT_MODEL;

    // Normalize admin payload if needed
    if ((lastMessage.payload as ADMIN_PENDING_PATIENT_MODEL).agent_id) {
      payload = mapAdminToAgentPending(
        lastMessage.payload as ADMIN_PENDING_PATIENT_MODEL
      );
    } else {
      payload = lastMessage.payload as AGENT_PENDING_PATIENT_MODEL;
    }

    const { type } = lastMessage;

    switch (type) {
      case "new_xray_report":
      case "new_ecg_report":
      case "completed_back":
      case "admin_mr_delete_back": {
        if (!isMyPatient(payload)) break;

        setDeletedPatientIds((prev) => {
          const updated = new Set(prev);
          updated.delete(payload._id);
          return updated;
        });

        if (page === 1) {
          setRealtimePatients((prev) => {
            const exists = prev.some((p) => p._id === payload._id);
            if (exists) {
              return prev.map((p) =>
                p._id === payload._id ? { ...p, ...payload } : p
              );
            }
            return [...prev, payload];
          });
        }
        break;
      }

      case "view_online_doctor": {
        const doctorId = payload.online_dr?._id;
        const doctorEmail = payload.online_dr?.email;

        if (doctorId && doctorEmail) {
          setOnlineDoctorsMap((prev) => ({
            ...prev,
            [payload._id]: { _id: doctorId, email: doctorEmail, id: doctorId },
          }));

          setRealtimePatients((prev) => {
            const index = prev.findIndex((p) => p._id === payload._id);
            if (index !== -1) {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                ...payload,
              };
              return updated;
            } else if (apiPatients?.some((p) => p._id === payload._id)) {
              return [...prev, { ...payload }];
            }
            return prev;
          });
        }
        break;
      }

      case "back_view_patient": {
        setOnlineDoctorsMap((prev) => {
          const updated = { ...prev };
          delete updated[payload._id];
          return updated;
        });

        setRealtimePatients((prev) => {
          const index = prev.findIndex((p) => p._id === payload._id);
          if (index !== -1) {
            const updated = [...prev];
            updated[index] = {
              ...updated[index],
              online_dr: emptyPendingDoctor(),
            };
            return updated;
          } else if (apiPatients?.some((p) => p._id === payload._id)) {
            return [
              ...prev,
              {
                ...payload,
                online_dr: emptyPendingDoctor(),
              },
            ];
          }
          return prev;
        });
        break;
      }

      case "submit_patient":
      case "delete_patient":
      case "patient_deleted": {
        setDeletedPatientIds((prev) => new Set(prev).add(payload._id));
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        setOnlineDoctorsMap((prev) => {
          const updated = { ...prev };
          delete updated[payload._id];
          return updated;
        });
        break;
      }

      case "select_doctor_and_update":
      case "update_patient": {
        if (!isMyPatient(payload)) {
          setRealtimePatients((prev) =>
            prev.filter((p) => p._id !== payload._id)
          );
          break;
        }

        setRealtimePatients((prev) => {
          const exists = prev.some((p) => p._id === payload._id);
          if (exists) {
            return prev.map((p) =>
              p._id === payload._id ? { ...p, ...payload } : p
            );
          }
          if (page === 1) return [...prev, payload];
          return prev;
        });
        break;
      }

      default:
        break;
    }
  }, [lastMessage, page, apiPatients, isMyPatient]);

  // ========================================
  // Merge realtime + API data
  // ========================================
  const mergedPatientData = useMemo(() => {
    const apiData = apiPatients || [];
    const filteredApiData = apiData.filter(
      (p) => !deletedPatientIds.has(p._id)
    );
    const realtimeMap = new Map(realtimePatients.map((p) => [p._id, p]));

    const merged = filteredApiData.map((apiPatient) => {
      const realtimeUpdate = realtimeMap.get(apiPatient._id);
      if (!realtimeUpdate) return apiPatient;

      const isDoctorIdUnpopulated =
        Array.isArray(realtimeUpdate.doctor_id) &&
        typeof realtimeUpdate.doctor_id[0] === "string";
      const isIgnoreDrUnpopulated =
        Array.isArray(realtimeUpdate.ignore_dr) &&
        typeof realtimeUpdate.ignore_dr[0] === "string";

      return {
        ...realtimeUpdate,
        doctor_id: isDoctorIdUnpopulated
          ? apiPatient.doctor_id
          : realtimeUpdate.doctor_id,
        ignore_dr: isIgnoreDrUnpopulated
          ? apiPatient.ignore_dr
          : realtimeUpdate.ignore_dr,
      };
    });

    // Add new patients on page 1
    if (page === 1) {
      const apiIds = new Set(filteredApiData.map((p) => p._id));
      const newPatients = realtimePatients.filter((p) => !apiIds.has(p._id));
      if (newPatients.length) return [...merged, ...newPatients];
    }

    return merged;
  }, [apiPatients, realtimePatients, deletedPatientIds, page]);

  return {
    mergedPatientData,
    onlineDoctorsMap,
    resetRealtime: () => {
      setRealtimePatients([]);
      setDeletedPatientIds(new Set());
      setOnlineDoctorsMap({});
    },
  };
};
