import { useAuth } from "@/shared/hooks";
import type {
  SelectDoctorAndUPdate,
  WSMessage,
} from "@/shared/hooks/use-web-socket/model/schema";
import type { AppDispatch } from "@/shared/redux/stores/stores";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PendingDoctorPatientListApi } from "../api/query";
import type { DOCTOR_PENDING_PATIENT_MODEL } from "./schema";

interface UseDoctorPendingPatientsSocketHandlerProps {
  messages: WSMessage[];
  page: number;
  limit: number;
  search: string;
  refetch: () => void;
}
interface TableDoctorPendingModel extends DOCTOR_PENDING_PATIENT_MODEL {
  key: string;
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

  const transformUpdateSelectedDoctor = useCallback(
    (payload: SelectDoctorAndUPdate) => {
      if (!payload || !payload.patient) {
        throw new Error("Invalid WS patient payload");
      }
      const p = payload.patient;

      return {
        ...p,
        key: p._id,
        doctor_id: Array.isArray(p.doctor_id)
          ? p.doctor_id.map((i) => i.id)
          : [],
        ignore_dr: Array.isArray(p.ignore_dr)
          ? p.ignore_dr.map((i) => i.id)
          : [],
      };
    },
    []
  );

  const updateAfterSelectedDoctor = useCallback(
    (payload: SelectDoctorAndUPdate) => {
      if (!payload || !user?.id) return;
      const currentDoctorId = user?.id;
      const transformPatient = transformUpdateSelectedDoctor(payload);
      const patientId = transformPatient._id;
      const isAssignedTo = transformPatient.doctor_id.includes(currentDoctorId);
      dispatch(
        PendingDoctorPatientListApi.util.updateQueryData(
          "getDoctorPendingPatientList",
          { page, limit, search },
          (draft) => {
            if (!draft?.data || !Array.isArray(draft.data)) return;
            if (isAssignedTo) {
              const index = draft.data.findIndex((p) => p._id === patientId);

              if (index !== -1) {
                const oldPatient = draft.data[index];
                (draft.data[index] as unknown as TableDoctorPendingModel) = {
                  ...oldPatient,
                  ...transformPatient,
                  key: patientId,
                  _id: patientId,
                } as unknown as TableDoctorPendingModel;

                console.log("Patient updated in doctor's pending list");
              } else {
                draft.data.unshift(transformPatient);
                console.log("Patient added to doctor's pending list");
              }
            } else {
              draft.data = draft.data.filter((p) => p._id !== patientId);
              console.log("Patient removed from doctor's pending list");
            }
          }
        )
      );
    },
    [dispatch, page, limit, search, transformUpdateSelectedDoctor, user?.id]
  );

  useEffect(() => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    console.log("New Message Received:", lastMessage.type);
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
    if (lastMessage.type === "admin_mr_delete_back") {
      refetch();
    }
    if (
      lastMessage.type === "back_view_patient" ||
      lastMessage.type === "new_xray_report" ||
      lastMessage.type === "delete_patient_from_admin"
    ) {
      refetch();
    }
    if (lastMessage.type === "select_doctor_and_update") {
      updateAfterSelectedDoctor(lastMessage.payload);
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
    updateAfterSelectedDoctor,
  ]);
};
