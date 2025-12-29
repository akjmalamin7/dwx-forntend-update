import { AdminCompletedPatientListApi } from "@/shared/redux/features/admin/completed-patients/completedPatientsApi";
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

export const useAdminCompletedSocketHandler = ({
  page,
  limit = 10,
  search,
  refetch,
  messages,
  isOpen,
  clearMessages,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const transformAdminDeletedBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      if (!payload || !payload.patient) {
        throw new Error("Invalid WS patient payload");
      }
      return {
        ...payload.patient,
        key: payload.patient._id,
        completed_time: payload.patient.completed_time ?? "",
      };
    },
    []
  );
  const updateAdminCompletedAfterSubmit = useCallback(() => {
    refetch?.();
  }, [refetch]);

  const udpateAdminCompletedAfterDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformAdminDeletedBack(payload);
      if (newPatient && newPatient.status === "completed") {
        dispatch(
          AdminCompletedPatientListApi.util.updateQueryData(
            "getAdminCompletedPatientList",
            { limit, page, search },
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
    [dispatch, page, limit, search, transformAdminDeletedBack]
  );
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    const messageToProcces = [...messages];
    clearMessages();
    messageToProcces.forEach((msg) => {
      if (msg.type === "admin_mr_delete_back") {
        udpateAdminCompletedAfterDeleteBack(msg.payload);
      }
      if (msg.type === "submit_patient") {
        updateAdminCompletedAfterSubmit();
      }
      if (msg.type === "delete_patient_from_admin") {
        refetch?.();
      }
    });
  }, [
    isOpen,
    messages,
    clearMessages,
    udpateAdminCompletedAfterDeleteBack,
    updateAdminCompletedAfterSubmit,
    refetch,
  ]);
};
