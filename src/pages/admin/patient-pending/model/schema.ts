import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";

export type NewXrayReportPayload = {
  message: string;
  success: boolean;
  savedPatient: ADMIN_PENDING_PATIENT_MODEL;
};

export type UpdatePatientPayload = {
  message?: string;
  success?: boolean;
  updatedPatient: Partial<ADMIN_PENDING_PATIENT_MODEL>;
};

export type DeletePatientPayload = {
  message?: string;
  success?: boolean;
  patientId: string;
};
export type ViewOnlineDoctorPayload = {
  patient_id: string;
  doctor: {
    _id: string;
    email: string;
    id?: string;
  };
};
export type WSMessage =
  | {
      type: "new_xray_report";
      payload: NewXrayReportPayload;
    }
  | {
      type: "update_patient";
      payload: UpdatePatientPayload;
    }
  | {
      type: "delete_patient";
      payload: DeletePatientPayload;
    }
  | {
      type: "view_online_doctor";
      payload: ViewOnlineDoctorPayload;
    }
  | {
      type: "stop_view_online_doctor";
      payload: ViewOnlineDoctorPayload;
    };
