import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
  AdmincompletedBack,
  AdminMrDeleteBack,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import { AgentPendingPatientListApi } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";

interface UseSocketHandlersProps {
  messages: WSMessage[];
  isOpen: boolean;
  clearMessages: () => void;
}
export const useAgentPendingPateintsSocketHandler = ({
  messages,
  isOpen,
  clearMessages,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();

  const addPatientGetFromArchive = useCallback(
    (payload: AdmincompletedBack) => {
      if (!payload || !payload.patient) {
        throw new Error("Invalid WS patient payload");
      }
      return {
        key: payload.patient._id,
        ...payload.patient,
      };
    },
    []
  );
  const transformDeleteBackValue = useCallback((payload: AdminMrDeleteBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      ...payload.patient,
      key: payload.patient._id,
      completed_time: payload.patient.completed_time ?? "",
      completed_dr: payload.patient.completed_dr
        ? [payload.patient.completed_dr]
        : [],
      online_dr: { _id: "", email: "", id: "" },
    };
  }, []);
  const cacheUpdateAfterAdminDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformDeleteBackValue(payload);
      if (newPatient && newPatient.status === "pending") {
        dispatch(
          AgentPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            undefined,
            (draft) => {
              const exist = draft.some((p) => p._id === newPatient._id);
              if (!exist) {
                draft.unshift(newPatient);
              }
            }
          )
        );
      }
    },
    [dispatch, transformDeleteBackValue]
  );
  const addArchivePatientAndUpdateCache = useCallback(
    (payload: AdmincompletedBack) => {
      const newPatient = addPatientGetFromArchive(payload);
      if (newPatient) {
        dispatch(
          AgentPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            undefined,
            (draft) => {
              const exist = draft.some((p) => p._id === newPatient._id);
              if (!exist) {
                const patientForPendingList = {
                  ...newPatient,

                  online_dr: { _id: "", email: "", id: "" },
                };
                draft.unshift(patientForPendingList);
              }
            }
          )
        );
      }
      clearMessages();
    },
    [dispatch, addPatientGetFromArchive, clearMessages]
  );

  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    messages.forEach((msg) => {
      if (msg.type === "completed_back") {
        addArchivePatientAndUpdateCache(msg.payload);
      }
      if (msg.type === "admin_mr_delete_back") {
        cacheUpdateAfterAdminDeleteBack(msg.payload);
      }
    });
  }, [
    isOpen,
    messages,
    dispatch,
    addArchivePatientAndUpdateCache,
    cacheUpdateAfterAdminDeleteBack,
  ]);
};
