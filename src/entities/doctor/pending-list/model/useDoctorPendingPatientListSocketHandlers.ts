import { useAuth } from "@/shared/hooks";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { AdminPendingPatientListApi } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PendingDoctorPatientListApi } from "../api/query";

interface UseDoctorPendingPatientsSocketHandlerProps {
  messages: WSMessage[];
  page: number;
  limit: number;
  search: string;
  refetch: () => void;
}
export const useDoctorPendingPatientsSocketHandler = ({
  messages,
  page,
  limit,
  search,
  refetch,
}: UseDoctorPendingPatientsSocketHandlerProps) => {
  const { user } = useAuth();
  const dispatch: AppDispatch = useDispatch();

  const removeDoctorPatientFromCache = useCallback(
    (patientId: string) => {
      dispatch(
        PendingDoctorPatientListApi.util.updateQueryData(
          "getDoctorPendingPatientList",
          { limit, page, search },
          (draft) => {
            if (draft.data) {
              draft.data = draft.data.filter((p) => p._id !== patientId);
            }
          }
        )
      );
    },
    [dispatch, limit, page, search]
  );

  const removeDoctorPatientAfterStopView = useCallback(
    (patientId: string) => {
      dispatch(
        PendingDoctorPatientListApi.util.updateQueryData(
          "getDoctorPendingPatientList",
          { page, limit, search },
          (draft) => {
            if (draft.data) {
              const index = draft.data.findIndex((p) => p._id === patientId);
              if (index !== -1) {
                draft.data.splice(index, 1);
              }
            }
          }
        )
      );
    },
    [dispatch, limit, page, search]
  );
  const removeAdminPatientFromCacheAfterSubmit = useCallback(
    (patientId: string) => {
      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { limit, page, search },
          (draft) => {
            if (draft.data) {
              draft.data = draft.data.filter((p) => p._id !== patientId);
            }
          }
        )
      );
    },
    [dispatch, limit, page, search]
  );

  useEffect(() => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    const currentDoctorId = user?.id;

    if (lastMessage.type === "view_online_doctor") {
      const { doctor, patient_id } = lastMessage.payload;
      if (doctor._id !== currentDoctorId) {
        removeDoctorPatientFromCache(patient_id);
      }
    }
    if (lastMessage.type === "stop_viewing_patient") {
      const targetPatientId = lastMessage.payload.patient_id;
      removeDoctorPatientAfterStopView(targetPatientId);
    }
    if (lastMessage.type === "submit_patient") {
      const targetPatientId = lastMessage.payload.patient_id;
      removeAdminPatientFromCacheAfterSubmit(targetPatientId);
    }
    if (lastMessage.type === "completed_back") {
      refetch();
    }

    if (
      lastMessage.type === "back_view_patient" ||
      lastMessage.type === "new_xray_report" ||
      lastMessage.type === "select_doctor_and_update" ||
      lastMessage.type === "delete_patient_from_admin"
    ) {
      refetch();
    }
  }, [
    messages,
    dispatch,
    page,
    limit,
    search,
    refetch,
    removeDoctorPatientFromCache,
    removeDoctorPatientAfterStopView,
    removeAdminPatientFromCacheAfterSubmit,
    user,
  ]);
};
