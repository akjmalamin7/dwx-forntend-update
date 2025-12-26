import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
  AdmincompletedBack,
  AdminMrDeleteBack,
  BackOnlineDoctorPayload,
  NewXrayReportPayload,
  ViewOnlineDoctorPayload,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import { AdminPendingPatientListApi } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";
import { useTransformPatient } from "./useTransformPatient";

interface OnlineDoctor {
  _id: string;
  email: string;
  id?: string;
}

interface UseSocketHandlersProps {
  messages: WSMessage[];
  page: number;
  limit: number;
  search: string;
  isOpen: boolean;
  clearMessages: () => void;
  setOnlineDoctorsMap: React.Dispatch<
    React.SetStateAction<Record<string, OnlineDoctor>>
  >;
}
export const useAdminPendingPatientsSocketHanlder = ({
  messages,
  page,
  limit,
  search,
  isOpen,
  clearMessages,
  setOnlineDoctorsMap,
}: UseSocketHandlersProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const {
    extractPatientPayload,
    transformWsPatient,
    addPatientGetFromArchive,
    transformDeleteBackValue,
  } = useTransformPatient();

  const cacheUpdateAfterAdminDeleteBack = useCallback(
    (payload: AdminMrDeleteBack) => {
      const newPatient = transformDeleteBackValue(payload);
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
    [dispatch, page, limit, search, transformDeleteBackValue]
  );

  const addArchivePatientAndUpdateCache = useCallback(
    (payload: AdmincompletedBack) => {
      const newPatient = addPatientGetFromArchive(payload);
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
    [dispatch, page, limit, search, addPatientGetFromArchive]
  );
  const addPatientToCache = useCallback(
    (payload: NewXrayReportPayload) => {
      const rawPatient = extractPatientPayload(payload);
      const newPatient = rawPatient ? transformWsPatient(rawPatient) : null;
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
    [dispatch, page, limit, search, extractPatientPayload, transformWsPatient]
  );
  const updateAdminPendingPatientCacheWhenDoctorOnlne = useCallback(
    (payload: ViewOnlineDoctorPayload) => {
      const { patient_id: wsPatientId, doctor } = payload;
      setOnlineDoctorsMap((prev) => ({ ...prev, [wsPatientId]: doctor }));
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
  const removeOnlineDoctorAfterClickOnBackViewPatient = useCallback(
    (payload: BackOnlineDoctorPayload) => {
      const wsPatientId = payload.patient_id;
      setOnlineDoctorsMap((prev) => {
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

  const deletePatientFromAdmin = useCallback(
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

  useEffect(() => {
    if (!isOpen || messages.length === 0) return;
    messages.forEach((msg) => {
      console.log("Processing Admin WS Message:", msg.type, msg.payload);

      if (msg.type === "new_xray_report") {
        addPatientToCache(msg.payload);
      }
      if (msg.type === "view_online_doctor") {
        updateAdminPendingPatientCacheWhenDoctorOnlne(msg.payload);
      }
      if (msg.type === "back_view_patient") {
        removeOnlineDoctorAfterClickOnBackViewPatient(msg.payload);
      }
      if (msg.type === "delete_patient_from_admin") {
        deletePatientFromAdmin(msg.payload.patient_id);
      }
      if (msg.type === "submit_patient") {
        deletePatientFromAdmin(msg.payload.patient_id);
      }
      if (msg.type === "completed_back") {
        addArchivePatientAndUpdateCache(msg.payload);
      }
      if (msg.type === "admin_mr_delete_back") {
        cacheUpdateAfterAdminDeleteBack(msg.payload);
      }
    });

    clearMessages();
  }, [
    messages,
    isOpen,
    clearMessages,
    addPatientToCache,
    setOnlineDoctorsMap,
    addArchivePatientAndUpdateCache,
    updateAdminPendingPatientCacheWhenDoctorOnlne,
    removeOnlineDoctorAfterClickOnBackViewPatient,
    deletePatientFromAdmin,
    cacheUpdateAfterAdminDeleteBack,
  ]);
};
