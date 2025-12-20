import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import type {
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
              if (!draft.data.some((p) => p._id === newPatient._id)) {
                draft.data.unshift(newPatient);
              }
            }
          )
        );
      }
    },
    [dispatch, page, limit, search, extractPatientPayload, transformWsPatient]
  );

  const removeDoctorStatus = useCallback(
    (wsPatientId: string) => {
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
    [dispatch, page, limit, search, setOnlineDoctorsMap]
  );

  const deletePatient = useCallback(
    (patientId: string) => {
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
    if (!isOpen || messages.length === 0) return;
    messages.forEach((msg) => {
      console.log("Processing Admin WS Message:", msg.type, msg.payload);

      switch (msg.type) {
        case "new_xray_report":
          addPatientToCache(msg.payload);
          break;

        case "view_online_doctor": {
          const { patient_id, doctor } = msg.payload;
          setOnlineDoctorsMap((prev) => ({ ...prev, [patient_id]: doctor }));
          break;
        }

        case "back_view_patient":
        case "stop_viewing_patient": {
          const pId = msg.payload?.patient_id;
          if (pId) removeDoctorStatus(pId);
          break;
        }

        case "delete_patient_from_admin":
        case "submit_patient": {
          const pId = msg.payload?.patient_id;
          if (pId) deletePatient(pId);
          break;
        }
      }
    });

    clearMessages();
  }, [
    messages,
    isOpen,
    clearMessages,
    addPatientToCache,
    removeDoctorStatus,
    deletePatient,
    setOnlineDoctorsMap,
  ]);
};
