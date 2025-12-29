import { AgentCompletedPatientListApi } from "@/shared/redux/features/agent/completed-patient-list/completedPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../use-dispatch/useAppDispatch";
import type { AdminMrDeleteBack, WSMessage } from "./schema";

interface UseSocketHandlersProps {
  messages: WSMessage[];
  clearMessages: () => void;
  isOpen?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  refetch?: () => void;
}

export const useAgentCompletedSocketHandler = ({
  page,
  limit = 10,
  search,
  refetch,
  messages,
  clearMessages,
  isOpen,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const isAgentObject = (
    val: unknown
  ): val is { _id: string; [key: string]: unknown } => {
    return typeof val === "object" && val !== null && "_id" in val;
  };
  const transformAgentMrDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      if (!payload || !payload.patient) {
        throw new Error("Invalid WS patient payload");
      }

      const p = payload.patient;

      return {
        ...p,
        key: p._id,

        agent_id: isAgentObject(p.agent_id)
          ? p.agent_id._id
          : String(p.agent_id),

        ignore_dr: Array.isArray(p.ignore_dr)
          ? p.ignore_dr.map((dr) => (isAgentObject(dr) ? dr._id : String(dr)))
          : [],

        doctor_id: Array.isArray(p.doctor_id)
          ? p.doctor_id.map((dr) => (isAgentObject(dr) ? dr._id : String(dr)))
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
    },
    []
  );
  const updateAgentCompletedAfterDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformAgentMrDeleteBack(payload);
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
    [dispatch, transformAgentMrDeleteBack, page, limit, search]
  );
  const updateAgentCompletedAfterPrintStatus = useCallback(() => {
    refetch?.();
  }, [refetch]);
  const updateAgentCompletedAfterSubmit = useCallback(() => {
    refetch?.();
  }, [refetch]);

  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    const messageToProcces = [...messages];
    clearMessages();
    messageToProcces.forEach((msg) => {
      if (msg.type === "admin_mr_delete_back") {
        updateAgentCompletedAfterDeleteBack(msg.payload);
      }
      if (msg.type === "update_print_status") {
        updateAgentCompletedAfterPrintStatus();
      }
      if (msg.type === "submit_patient") {
        updateAgentCompletedAfterSubmit();
      }
      if (msg.type === "delete_patient_from_admin") {
        refetch?.();
      }
    });
  }, [
    messages,
    clearMessages,
    isOpen,
    updateAgentCompletedAfterDeleteBack,
    updateAgentCompletedAfterPrintStatus,
    updateAgentCompletedAfterSubmit,
    refetch,
  ]);
};
