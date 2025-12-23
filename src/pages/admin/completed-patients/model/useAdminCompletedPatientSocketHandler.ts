import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
  AdminMrDeleteBack,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import { AdminCompletedPatientListApi } from "@/shared/redux/features/admin/completed-patients/completedPatientsApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";

interface UseSocketHandlersProps {
  messages: WSMessage[];
  page: number;
  limit: number;
  search: string;
  isOpen?: boolean;
  clearMessages: () => void;
}
export const useAdminCompletedPatientSocketHandler = ({
  messages,
  page,
  limit,
  search,
  isOpen,
  clearMessages,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const transformValue = useCallback((payload: AdminMrDeleteBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      ...payload.patient,
      key: payload.patient._id,
      completed_time: payload.patient.completed_time ?? "",
    };
  }, []);
  // admin_mr_delete_back
  const cacheUpdateAfterAdminDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformValue(payload);
      if (newPatient && newPatient.status === "completed") {
        dispatch(
          AdminCompletedPatientListApi.util.updateQueryData(
            "getAdminCompletedPatientList",
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
    [dispatch, page, limit, search, transformValue]
  );
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    messages.forEach((msg) => {
      if (msg.type === "admin_mr_delete_back") {
        if (msg.payload.patient.status === "completed") {
          cacheUpdateAfterAdminDeleteBack(msg.payload);
        }
      }
    });
    clearMessages();
  }, [isOpen, messages, cacheUpdateAfterAdminDeleteBack, clearMessages]);
};
