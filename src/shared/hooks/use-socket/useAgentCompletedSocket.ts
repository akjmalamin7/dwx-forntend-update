import type { ADMIN_COMPLETED_PATIENTS_MODEL } from "@/shared/redux/features/admin/completed-patients/completedPatients.types";
import type { AGENT_COMPLETED_PATIENT_MODEL } from "@/shared/redux/features/agent/completed-patient-list/completedPatientList.types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../use-auth/useAuth";
import type { WSMessage } from "./schema";
import { useSocket } from "./useSocket";

interface UseAgentCompletedSocketProps {
  wsUrl: string;
  page: number;
  apiPatients?: AGENT_COMPLETED_PATIENT_MODEL[];
}

export const useAgentCompedPatientSocket = ({
  wsUrl,
  page,
  apiPatients,
}: UseAgentCompletedSocketProps) => {
  const { user } = useAuth();
  const [realtimePatients, setRealtimePatients] = useState<
    AGENT_COMPLETED_PATIENT_MODEL[]
  >([]);
  const [deletedPatientIds, setDeletedPatientIds] = useState<Set<string>>(
    new Set()
  );
  const lastProcessedRef = useRef<WSMessage | null>(null);
  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);

  /** Map Admin completed patient → Agent completed patient */
  const mapAdminToAgentCompleted = (
    payload: ADMIN_COMPLETED_PATIENTS_MODEL
  ): AGENT_COMPLETED_PATIENT_MODEL => {
    return {
      _id: payload._id,
      agent_id: payload.agent_id?._id || "",
      doctor_id: Array.isArray(payload.doctor_id)
        ? payload.doctor_id.map((d) => d._id)
        : [],
      completed_dr: payload.completed_dr,
      ignore_dr: Array.isArray(payload.ignore_dr)
        ? payload.ignore_dr.map((d) => d._id)
        : [],
      patient_id: payload.patient_id,
      name: payload.name,
      age: payload.age,
      gender: payload.gender,
      history: payload.history,
      ref_doctor: payload.ref_doctor,
      image_type: payload.image_type,
      xray_name: payload.xray_name,
      rtype: payload.rtype,
      status: payload.status,
      soft_delete: payload.soft_delete,
      month_year: payload.month_year,
      completed_time: payload.completed_time,
      is_checked: payload.is_checked,
      logged: payload.logged,
      printstatus: payload.printstatus,
      study_for: payload.study_for,
      viewed: payload.viewed,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      __v: payload.__v,
      id: payload.id,
    };
  };

  /** Check if patient belongs to current agent */
  const isMyPatient = useCallback(
    (patient: AGENT_COMPLETED_PATIENT_MODEL) => {
      if (!user?.id) return false;
      return patient.agent_id === user.id;
    },
    [user?.id]
  );

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
          setRealtimePatients((prev) => {
            const exists = prev.some((p) => p._id === payload._id);
            if (exists) {
              return prev.map((p) =>
                p._id === payload._id ? mapAdminToAgentCompleted(payload) : p
              );
            }
            return [...prev, mapAdminToAgentCompleted(payload)];
          });
        }
        break;
      }

      case "delete_patient":
      case "completed_back":
      case "admin_mr_delete_back": {
        setDeletedPatientIds((prev) => new Set(prev).add(payload._id));
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        break;
      }

      case "update_print_status":
      case "update_patient": {
        // Only map if payload is completed patient
        if ("agent_id" in payload) {
          const mapped = mapAdminToAgentCompleted(
            payload as ADMIN_COMPLETED_PATIENTS_MODEL
          );
          if (!isMyPatient(mapped)) {
            setRealtimePatients((prev) =>
              prev.filter((p) => p._id !== mapped._id)
            );
            break;
          }

          setRealtimePatients((prev) => {
            const exists = prev.some((p) => p._id === mapped._id);
            if (exists) {
              return prev.map((p) =>
                p._id === mapped._id
                  ? { ...p, ...mapped, lastUpdated: Date.now() }
                  : p
              );
            } else {
              if (page === 1) {
                return [...prev, mapped];
              }
              return prev;
            }
          });
        }
        break;
      }

      default:
        break;
    }
  }, [lastMessage, page, isMyPatient]);

  const resetRealtime = () => {
    setRealtimePatients([]);
    setDeletedPatientIds(new Set());
  };

  const mergedPatientData = useMemo(() => {
    const apiData = apiPatients || [];

    const filteredApiData = apiData.filter(
      (p) => !deletedPatientIds.has(p._id)
    );

    const realtimeMap = new Map(realtimePatients.map((p) => [p._id, p]));

    const merged = filteredApiData.map((apiPatient) => {
      const realtimeUpdate = realtimeMap.get(apiPatient._id);

      if (!realtimeUpdate) {
        return apiPatient;
      }

      const isCompletedDrUnpopulated =
        realtimeUpdate.completed_dr &&
        typeof realtimeUpdate.completed_dr === "string";

      return {
        ...realtimeUpdate,
        completed_dr: isCompletedDrUnpopulated
          ? apiPatient.completed_dr
          : realtimeUpdate.completed_dr,
      };
    });

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
    resetRealtime,
  };
};
