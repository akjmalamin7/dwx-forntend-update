import type { DOCTOR_PENDING_PATIENT_MODEL } from "@/entities/doctor/pending-list/model/schema";
import { useAuth } from "@/shared/hooks/use-auth/useAuth";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import type { AGENT_PENDING_PATIENT_MODEL } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientList.types";
import { useCallback, useEffect, useRef, useState } from "react";
import type { WSMessage } from "./schema";
import { useSocket } from "./useSocket";

interface UseDoctorPatientSocketProps {
  wsUrl: string;
  page: number;
  apiPatients?: DOCTOR_PENDING_PATIENT_MODEL[];
  refetch?: () => void;
}
type DoctorRef = string | { _id: string; email?: string; id?: string };
export const useDoctorPendingSocket = ({
  wsUrl,
  page,
  apiPatients,
  refetch,
}: UseDoctorPatientSocketProps) => {
  const { user } = useAuth();
  const { lastMessage } = useSocket<WSMessage>(wsUrl, 5000);
  const [realtimePatients, setRealtimePatients] = useState<
    DOCTOR_PENDING_PATIENT_MODEL[]
  >([]);
  const [deletedPatientIds, setDeletedPatientIds] = useState<Set<string>>(
    new Set()
  );
  const lastProcessedRef = useRef<WSMessage | null>(null);
  const mapAgentToDoctorPatient = (
    patient: AGENT_PENDING_PATIENT_MODEL
  ): DOCTOR_PENDING_PATIENT_MODEL => {
    return {
      ...patient,
      doctor_id: patient.doctor_id.map((d) => d._id), // string[]
      ignore_dr: patient.ignore_dr.map((d) => d._id), // string[]
      online_dr: patient.online_dr
        ? {
            _id: patient.online_dr._id,
            email: patient.online_dr.email,
            id: patient.online_dr._id,
          }
        : { _id: "", email: "", id: "" }, // must match DOCTOR_PENDING_PATIENT
      completed_time: patient.completed_time ?? "", // normalize null to empty string
    };
  };

  const mapAdminToDoctorPatient = (
    patient: ADMIN_PENDING_PATIENT_MODEL
  ): DOCTOR_PENDING_PATIENT_MODEL => ({
    ...patient,
    doctor_id: patient.doctor_id.map((d) => d._id), // string[]
    ignore_dr: patient.ignore_dr.map((d) => d._id), // string[]
    online_dr: patient.online_dr
      ? {
          _id: patient.online_dr._id,
          email: patient.online_dr.email,
          id: patient.online_dr._id,
        }
      : { _id: "", email: "", id: "" },
    completed_time: patient.completed_time ?? "", // ensure string
  });

  // Determine if a patient should be shown to this doctor
  const isPatientForMe = useCallback(
    (patient: DOCTOR_PENDING_PATIENT_MODEL) => {
      if (!user?.id) return false;

      const isIgnored = patient.ignore_dr?.some((d: DoctorRef) => {
        if (typeof d === "string") return d === user.id;
        return d._id === user.id || d.id === user.id;
      });

      if (isIgnored) return false;

      const doctorIdArray = patient.doctor_id || [];

      if (doctorIdArray.length === 0) return true;

      return doctorIdArray.some((d: DoctorRef) => {
        if (typeof d === "string") return d === user.id;
        return d._id === user.id || d.id === user.id;
      });
    },
    [user?.id]
  );

  // Merge API + realtime patient data
  const mergedPatientData = useCallback(() => {
    const apiData = apiPatients || [];

    // Filter out deleted patients
    const filteredApi = apiData.filter((p) => !deletedPatientIds.has(p._id));

    const realtimeMap = new Map(realtimePatients.map((p) => [p._id, p]));

    // Merge: if a patient exists in realtime, use its updated fields
    const merged = filteredApi.map((apiPatient) => {
      const realtime = realtimeMap.get(apiPatient._id);
      if (!realtime) return apiPatient;

      return {
        ...apiPatient, // start with API data
        ...realtime, // overwrite with realtime updates
        doctor_id:
          Array.isArray(realtime.doctor_id) &&
          typeof realtime.doctor_id[0] === "string"
            ? apiPatient.doctor_id
            : realtime.doctor_id,
        ignore_dr:
          Array.isArray(realtime.ignore_dr) &&
          typeof realtime.ignore_dr[0] === "string"
            ? apiPatient.ignore_dr
            : realtime.ignore_dr,
      };
    });

    // Add new realtime patients not in API
    if (page === 1) {
      const apiIds = new Set(filteredApi.map((p) => p._id));
      const newPatients = realtimePatients.filter((p) => !apiIds.has(p._id));
      return [...newPatients, ...merged];
    }

    return merged;
  }, [apiPatients, realtimePatients, deletedPatientIds, page]);

  useEffect(() => {
    if (!lastMessage || !lastMessage.payload?._id) return;
    if (lastProcessedRef.current === lastMessage) return;
    lastProcessedRef.current = lastMessage;

    const { type, payload } = lastMessage;

    switch (type) {
       
      case "back_view_patient":
      case 'completed_back':
      case 'admin_mr_delete_back':
      case "new_xray_report": {
        if (page === 1) { 
          const mappedPayload = mapAdminToDoctorPatient(payload as ADMIN_PENDING_PATIENT_MODEL);

          // Check permissions
          if (!isPatientForMe(mappedPayload)) {
            console.log(`[DOCTOR] Patient not for me, skipping`);
            break;
          }
           
          setDeletedPatientIds(prev => {
            const updated = new Set(prev);
            updated.delete(mappedPayload._id);
            return updated;
          });
          
          setRealtimePatients((prev) => {
            const exists = prev.some((p) => p._id === mappedPayload._id);
            if (exists) {
              return prev.map((p) =>
                p._id === mappedPayload._id ? mappedPayload : p
              );
            }
            return [mappedPayload, ...prev];
          });
        }
        break;
      }

    
       case "view_online_doctor": { 
        const doctorPayload = mapAdminToDoctorPatient(payload);
        
        if (isPatientForMe(doctorPayload)) { 
          setDeletedPatientIds(prev => new Set(prev).add(payload._id));
           
          setRealtimePatients(prev => 
            prev.filter(p => p._id !== payload._id)
          ); 
          
          console.log(`[DOCTOR] Patient ${payload._id.slice(-6)} being viewed, removed from list`);
        }
        
        break;
      }



      case "select_doctor_and_update": {
        const doctorPayload = mapAgentToDoctorPatient(payload);

        const shouldShow = isPatientForMe(doctorPayload);
        const isInRealtime = realtimePatients.some(
          (p) => p._id === doctorPayload._id
        );
        const isInApi = apiPatients?.some((p) => p._id === doctorPayload._id);

        if (!shouldShow) {
          if (isInRealtime || isInApi) {
            setRealtimePatients((prev) =>
              prev.filter((p) => p._id !== doctorPayload._id)
            );
            if (isInApi && refetch) refetch();
          }
        } else {
          setRealtimePatients((prev) => {
            const exists = prev.some((p) => p._id === doctorPayload._id);
            if (exists)
              return prev.map((p) =>
                p._id === doctorPayload._id ? { ...p, ...doctorPayload } : p
              );
            if (page === 1) return [doctorPayload, ...prev];
            return prev;
          });
          if (refetch) refetch();
        }
        break;
      }

      case "delete_patient":
      case "submit_patient":
      case "patient_deleted":
        setDeletedPatientIds((prev) => new Set(prev).add(payload._id));
        setRealtimePatients((prev) =>
          prev.filter((p) => p._id !== payload._id)
        );
        if (refetch) refetch();
        break;

      case "update_patient": {
        const doctorPayload = mapAdminToDoctorPatient(payload);

        if (isPatientForMe(doctorPayload)) {
          setRealtimePatients((prev) => {
            const exists = prev.some((p) => p._id === doctorPayload._id);
            if (exists)
              return prev.map((p) =>
                p._id === doctorPayload._id ? { ...p, ...doctorPayload } : p
              );
            if (page === 1) return [doctorPayload, ...prev];
            return prev;
          });

          if (apiPatients?.some((p) => p._id === doctorPayload._id) && refetch)
            refetch();
        } else {
          setRealtimePatients((prev) =>
            prev.filter((p) => p._id !== doctorPayload._id)
          );
        }
        break;
      }

      default:
        break;
    }
  }, [
    lastMessage,
    page,
    apiPatients,
    realtimePatients,
    refetch,
    isPatientForMe,
  ]);

  return {
    mergedPatientData: mergedPatientData(),
    resetRealtime: () => {
      setRealtimePatients([]);
    },
  };
};
