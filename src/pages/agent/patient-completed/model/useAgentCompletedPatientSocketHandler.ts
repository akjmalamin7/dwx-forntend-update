import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
  AdminMrDeleteBack,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import { AgentCompletedPatientListApi } from "@/shared/redux/features/agent/completed-patient-list/completedPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";

interface UseSocketHandlersProps {
  messages: WSMessage[];
  isOpen: boolean;
  page?: number;
  limit?: number;
  search?: string;
  clearMessages?: () => void;
  refetch?: () => void;
}

export const useAgentCompletedPatientSocketHandler = ({
  messages,
  isOpen,
  clearMessages,
  page,
  limit,
  search,
  refetch,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();

  const isObject = (
    val: unknown
  ): val is { _id: string; [key: string]: unknown } => {
    return typeof val === "object" && val !== null && "_id" in val;
  };

  const transformDeleteBackValue = useCallback((payload: AdminMrDeleteBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }

    const p = payload.patient;

    return {
      ...p,
      key: p._id,

      agent_id: isObject(p.agent_id) ? p.agent_id._id : String(p.agent_id),

      ignore_dr: Array.isArray(p.ignore_dr)
        ? p.ignore_dr.map((dr) => (isObject(dr) ? dr._id : String(dr)))
        : [],

      doctor_id: Array.isArray(p.doctor_id)
        ? p.doctor_id.map((dr) => (isObject(dr) ? dr._id : String(dr)))
        : [],

      completed_dr: p.completed_dr
        ? {
            _id: p.completed_dr._id,
            email:
              "email" in p.completed_dr
                ? (p.completed_dr as { email: string }).email
                : "",
            id: p.completed_dr._id,
          }
        : { _id: "", email: "", id: "" },

      completed_time: p.completed_time ?? "",
      online_dr: { _id: "", email: "", id: "" },
    };
  }, []);
  const cacheUpdateAfterAdminDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformDeleteBackValue(payload);
      if (newPatient && newPatient.status === "completed") {
        dispatch(
          AgentCompletedPatientListApi.util.updateQueryData(
            "getAgentCompletedPatientList",
            { page, limit, search },
            (draft) => {
              const exist = draft.data.some((p) => p._id === newPatient._id);
              if (!exist) {
                draft.data.unshift(newPatient);
              }
            }
          )
        );
      }
    },
    [dispatch, transformDeleteBackValue, page, limit, search]
  );

  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    messages.forEach((msg) => {
      if (msg.type === "admin_mr_delete_back") {
        cacheUpdateAfterAdminDeleteBack(msg.payload);
      }
      if (msg.type === "update_print_status") {
        refetch?.();
      }
      if (msg.type === "submit_patient") {
        refetch?.();
      }
    });
    clearMessages?.();
  }, [
    isOpen,
    messages,
    dispatch,
    clearMessages,
    cacheUpdateAfterAdminDeleteBack,
    refetch,
    limit,
    page,
    search,
  ]);
};
