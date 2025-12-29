import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";

import { AdminPendingPatientListApi } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../use-dispatch/useAppDispatch";
import type {
  AdmincompletedBack,
  AdminMrDeleteBack,
  BackOnlineDoctorPayload,
  NewXrayReportPayload,
  ViewOnlineDoctorPayload,
  WSMessage,
} from "./schema";

interface OnlineDoctor {
  _id: string;
  email: string;
  id?: string;
}

interface UseSocketHandlersProps {
  messages: WSMessage[];
  clearMessages: () => void;
  isOpen?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  refetch?: () => void;
  setOnlineDoctorsMap: React.Dispatch<
    React.SetStateAction<Record<string, OnlineDoctor>>
  >;
}

export const useAdminPendingSocketHandler = ({
  page,
  limit = 10,
  search,
  messages,
  isOpen,
  clearMessages,
  setOnlineDoctorsMap,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const transformDeleteBack = useCallback((payload: AdminMrDeleteBack) => {
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
  const transformCompleteBack = useCallback((payload: AdmincompletedBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      key: payload.patient._id,
      ...payload.patient,
    };
  }, []);
  const extractTransformXrayOrEcgPatient = useCallback(
    (payload: NewXrayReportPayload) => {
      if (!payload) return null;
      if (payload.savedPatient._id) return payload;
      return null;
    },
    []
  );

  const transformXrayOrEcgPatient = useCallback(
    (payload: NewXrayReportPayload) => {
      if (!payload || !payload.savedPatient._id) {
        throw new Error("Invalid WS patient payload");
      }
      return {
        key: payload.savedPatient._id,
        ...payload.savedPatient,
      };
    },
    []
  );
  const updateAdminPendingAfterAddXrayOrEcg = useCallback(
    (payload: NewXrayReportPayload) => {
      const rawPatient = extractTransformXrayOrEcgPatient(payload);
      const newPatient = rawPatient
        ? transformXrayOrEcgPatient(rawPatient)
        : null;
      if (newPatient) {
        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
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
    [
      dispatch,
      page,
      limit,
      search,
      extractTransformXrayOrEcgPatient,
      transformXrayOrEcgPatient,
    ]
  );
  const updateAdminPendingAfterViewingPatient = useCallback(
    (payload: ViewOnlineDoctorPayload) => {
      const { patient_id: wsPatientId, doctor } = payload;
      setOnlineDoctorsMap?.((prev) => ({ ...prev, [wsPatientId]: doctor }));
      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            const patient = draft.data.find((p) => p._id === wsPatientId);
            if (patient) {
              patient.online_dr = {
                _id: doctor._id,
                email: doctor.email,
                id: doctor.id ?? "",
              };
            }
          }
        )
      );
    },
    [dispatch, limit, page, search, setOnlineDoctorsMap]
  );
  const updateAdminPendingAfterBackView = useCallback(
    (payload: BackOnlineDoctorPayload) => {
      const wsPatientId = payload.patient_id;
      setOnlineDoctorsMap?.((prev) => {
        const updatedMap = { ...prev };
        delete updatedMap[wsPatientId];
        return updatedMap;
      });

      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            const patient = draft.data.find((p) => p._id === wsPatientId);
            if (patient) {
              patient.online_dr = { _id: "", email: "", id: "" };
            }
          }
        )
      );
    },
    [dispatch, limit, page, search, setOnlineDoctorsMap]
  );
  const updateAdminPendingAfterDeletePatientFromAdmin = useCallback(
    (patient_id: string) => {
      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            draft.data = draft.data.filter((p) => p._id !== patient_id);
          }
        )
      );
    },
    [dispatch, page, limit, search]
  );
  const updateAdminPendingAfterDoctorSubmit = useCallback(
    (patient_id: string) => {
      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            draft.data = draft.data.filter((p) => p._id !== patient_id);
          }
        )
      );
    },
    [dispatch, page, limit, search]
  );
  const updaetAdminPeningAfterCompleteBack = useCallback(
    (payload: AdmincompletedBack) => {
      const newPatient = transformCompleteBack(payload);
      if (newPatient) {
        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
            "getPendingPatientList",
            { page, limit, search },
            (draft) => {
              const exist = draft.data.some((p) => p._id === newPatient.key);
              if (!exist) {
                const patientForPendingList = {
                  ...newPatient,
                  online_dr: { _id: "", email: "", id: "" },
                };
                draft.data.unshift(
                  patientForPendingList as ADMIN_PENDING_PATIENT_MODEL
                );
              }
            }
          )
        );
      }
    },
    [dispatch, limit, page, search, transformCompleteBack]
  );
  const updateAdminPendingAfterDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformDeleteBack(payload);
      if (newPatient && newPatient.status === "pending") {
        dispatch(
          AdminPendingPatientListApi.util.updateQueryData(
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
    [dispatch, page, limit, search, transformDeleteBack]
  );
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    const messageToProcces = [...messages];
    clearMessages();
    messageToProcces.forEach((msg) => {
      if (msg.type === "new_xray_report") {
        updateAdminPendingAfterAddXrayOrEcg(msg.payload);
      }
      if (msg.type === "view_online_doctor") {
        updateAdminPendingAfterViewingPatient(msg.payload);
      }
      if (msg.type === "back_view_patient") {
        updateAdminPendingAfterBackView(msg.payload);
      }
      if (msg.type === "delete_patient_from_admin") {
        updateAdminPendingAfterDeletePatientFromAdmin(msg.payload.patient_id);
      }
      if (msg.type === "submit_patient") {
        updateAdminPendingAfterDoctorSubmit(msg.payload.patient_id);
      }
      if (msg.type === "completed_back") {
        updaetAdminPeningAfterCompleteBack(msg.payload);
      }
      if (msg.type === "admin_mr_delete_back") {
        updateAdminPendingAfterDeleteBack(msg.payload);
      }
    });
  }, [
    isOpen,
    messages,
    clearMessages,
    updateAdminPendingAfterDeleteBack,
    updaetAdminPeningAfterCompleteBack,
    updateAdminPendingAfterDoctorSubmit,
    updateAdminPendingAfterDeletePatientFromAdmin,
    updateAdminPendingAfterBackView,
    updateAdminPendingAfterViewingPatient,
    updateAdminPendingAfterAddXrayOrEcg,
  ]);
};
