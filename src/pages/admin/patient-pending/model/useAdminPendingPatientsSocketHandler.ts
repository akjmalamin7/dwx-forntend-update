import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
  BackOnlineDoctorPayload,
  DeletePatientFromAdminPayload,
  NewXrayReportPayload,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
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
  const { extractPatientPayload, transformWsPatient } = useTransformPatient();
  // update cache on admin pending patient when add a new report from agent
  const addPatientAndCacheUpdate = useCallback(
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
    [dispatch, extractPatientPayload, transformWsPatient, page, limit, search]
  );
  // remove online_dr on admin pending patient after viewing back from doctor
  const updateOnlineDoctorAfterBack = useCallback(
    (payload: BackOnlineDoctorPayload) => {
      const wsPatientId = payload.patient_id;

      setOnlineDoctorsMap((prev) => {
        const updateMap = { ...prev };
        delete updateMap[wsPatientId];
        return updateMap;
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
    [dispatch, setOnlineDoctorsMap, page, limit, search]
  );
  // delte patient from admin
  const deletePatientFromAdmin = useCallback(
    (payload: DeletePatientFromAdminPayload) => {
      const patientId = payload.patient_id;
      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            draft.data = draft.data.filter((p) => p._id !== patientId);
          }
        )
      );
    },
    [dispatch, page, limit, search]
  );

  useEffect(() => {
    if (!messages.length || !isOpen) return;

    messages.forEach((msg) => {
      switch (msg.type) {
        case "new_xray_report":
          addPatientAndCacheUpdate(msg.payload);
          break;
        case "view_online_doctor": {
          const { patient_id: wsPatientId, doctor } = msg.payload;
          setOnlineDoctorsMap((prev) => ({ ...prev, [wsPatientId]: doctor }));
          break;
        }
        case "back_view_patient":
          updateOnlineDoctorAfterBack(msg.payload);
          break;
        case "delete_patient_from_admin":
        case "submit_patient":
          deletePatientFromAdmin(msg.payload as DeletePatientFromAdminPayload);
          break;
      }
    });

    clearMessages?.();
  }, [
    messages,
    isOpen,
    clearMessages,
    addPatientAndCacheUpdate,
    updateOnlineDoctorAfterBack,
    deletePatientFromAdmin,
    setOnlineDoctorsMap,
  ]);
};
