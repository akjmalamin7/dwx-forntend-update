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
  const dispatch: AppDispatch = useDispatch();
  // remove data
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
  const removeAdminPatientFromCache = useCallback(
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
    // action distrubution according message type
    switch (lastMessage.type) {
      case "stop_viewing_patient": {
        const targetId = lastMessage.payload?.patient_id;
        if (targetId) removeDoctorPatientFromCache(targetId);
        break;
      }
      case "submit_patient": {
        const targetId = lastMessage.payload?.patient_id;
        if (targetId) removeAdminPatientFromCache(targetId);
        break;
      }
      case "back_view_patient":
      case "new_xray_report":
      case "delete_patient_from_admin": {
        refetch();
        break;
      }
      default: {
        console.log("Unhandled WS message type:", lastMessage.type);
        break;
      }
    }
  }, [
    messages,
    dispatch,
    page,
    limit,
    search,
    refetch,
    removeDoctorPatientFromCache,
    removeAdminPatientFromCache,
  ]);
};
