import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
  AdmincompletedBack,
  AdminMrDeleteBack,
  NewXrayReportPayload,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import { AgentPendingPatientListApi } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";

interface UseSocketHandlersProps {
  messages: WSMessage[];
  isOpen: boolean;
  page?: number;
  limit?: number;
  search?: string;
  clearMessages: () => void;
  refetch?: () => void;
}
export const useAgentPendingPateintsSocketHandler = ({
  messages,
  refetch,
  page,
  limit,
  search,
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
  const addArchivePatientAndUpdateCache = useCallback(
    (payload: AdmincompletedBack) => {
      const newPatient = addPatientGetFromArchive(payload);
      if (newPatient) {
        dispatch(
          AgentPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              const exist = draft.data.some((p) => p._id === newPatient._id);
              if (!exist) {
                const patientForPendingList = {
                  ...newPatient,

                  online_dr: { _id: "", email: "", id: "" },
                };
                draft.data.unshift(patientForPendingList);
              }
            }
          )
        );
      }
    },
    [dispatch, addPatientGetFromArchive, page, limit, search]
  );

  const transformWsPatient = useCallback((payload: NewXrayReportPayload) => {
    if (!payload || !payload.savedPatient._id) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      key: payload.savedPatient._id,
      ...payload.savedPatient,
    };
  }, []);

  const extractPatientPayload = useCallback((payload: NewXrayReportPayload) => {
    if (!payload) return null;
    if (payload.savedPatient._id) return payload;
    return null;
  }, []);

  const addPatientToCache = useCallback(
    (payload: NewXrayReportPayload) => {
      const rawPatient = extractPatientPayload(payload);
      const newPatient = rawPatient ? transformWsPatient(rawPatient) : null;
      if (newPatient) {
        dispatch(
          AgentPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              const exists = draft.data.some((p) => p._id === newPatient._id);
              if (!exists) {
                draft.data.unshift(newPatient);
              }
            }
          )
        );
      }
    },
    [dispatch, page, limit, search, extractPatientPayload, transformWsPatient]
  );

  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    messages.forEach((msg) => {
      if (msg.type === "new_ecg_report" || msg.type === "new_xray_report") {
        console.log(msg.payload);
        addPatientToCache(msg.payload);
      }
      if (msg.type === "completed_back") {
        addArchivePatientAndUpdateCache(msg.payload);
      }
      if (msg.type === "admin_mr_delete_back") {
        cacheUpdateAfterAdminDeleteBack(msg.payload);
      }
      // if (msg.type === "new_xray_report") {
      //   refetch?.();
      // }
    });
    clearMessages();
  }, [
    isOpen,
    messages,
    dispatch,
    addArchivePatientAndUpdateCache,
    cacheUpdateAfterAdminDeleteBack,
    addPatientToCache,
    refetch,
    clearMessages,
  ]);
};
