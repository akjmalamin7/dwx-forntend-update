import { DoctorCompletedPatientListApi } from "@/entities/doctor/completed-patients/api/query";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../use-dispatch/useAppDispatch";
import type { AdminMrDeleteBack, WSMessage } from "./schema";

interface UseSocketHandlersProps {
  messages: WSMessage[];
  clearMessages: () => void;
  page?: number;
  limit?: number;
  search?: string;
  refetch?: () => void;
}
interface DoctorBasicInfo {
  _id: string;
  id?: string;
  email?: string;
  [key: string]: unknown;
}
export const useDoctorCompletedSocketHandler = ({
  page,
  limit = 10,
  search,
  refetch,
  messages,
  clearMessages,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const isDoctorObj = (val: unknown): val is DoctorBasicInfo => {
    return typeof val === "object" && val !== null && "_id" in val;
  };
  const transformDoctorMrDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      if (!payload || !payload.patient) {
        throw new Error("Invalid WS patient payload");
      }

      const p = payload.patient;

      return {
        ...p,
        key: p._id,

        agent_id: isDoctorObj(p.agent_id) ? p.agent_id._id : String(p.agent_id),

        completed_dr: isDoctorObj(p.completed_dr)
          ? [
              {
                _id: p.completed_dr._id,
                id: p.completed_dr.id || p.completed_dr._id,
                email: p.completed_dr.email || "",
              },
            ]
          : [],

        ignore_dr: Array.isArray(p.ignore_dr)
          ? p.ignore_dr.map((dr) => (isDoctorObj(dr) ? dr._id : String(dr)))
          : [],

        doctor_id: Array.isArray(p.doctor_id)
          ? p.doctor_id.map((dr) => (isDoctorObj(dr) ? dr._id : String(dr)))
          : [],

        completed_time: p.completed_time ?? "",
        online_dr: { _id: "", email: "", id: "" },
      };
    },
    []
  );
  const updateDoctorCompletedAfterDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformDoctorMrDeleteBack(payload);
      if (newPatient && newPatient.status === "completed") {
        dispatch(
          DoctorCompletedPatientListApi.util.updateQueryData(
            "getDoctorCompletedPatientList",
            { page, limit, search },
            (draft) => {
              const exist = draft.data.some((p) => p._id === newPatient._id);
              if (!exist) {
                draft.data.push(newPatient);
              }
            }
          )
        );
      }
    },
    [dispatch, transformDoctorMrDeleteBack, page, limit, search]
  );
  const updateDoctorCompletedAfterSubmit = useCallback(() => {
    refetch?.();
  }, [refetch]);
  useEffect(() => {
    if (!messages.length) return;
    messages.forEach((msg) => {
      if (msg.type === "submit_patient") {
        updateDoctorCompletedAfterSubmit();
      }
      if (msg.type === "admin_mr_delete_back") {
        updateDoctorCompletedAfterDeleteBack(msg.payload);
      }
    });

    clearMessages();
  }, [
    messages,
    clearMessages,
    updateDoctorCompletedAfterSubmit,
    updateDoctorCompletedAfterDeleteBack,
  ]);
};
