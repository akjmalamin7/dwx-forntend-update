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
export type BackOnlineDoctorPayload = {
  patient_id: string;
};
export type DeletePatientFromAdminPayload = {
  patient_id: string;
};
export type SubmitPatientPayload = {
  patient_id: string;
  patient: Partial<ADMIN_PENDING_PATIENT_MODEL>;
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
      type: "stop_viewing_patient";
      payload: ViewOnlineDoctorPayload;
    }
  | {
      type: "back_view_patient";
      payload: BackOnlineDoctorPayload;
    }
  | {
      type: "delete_patient_from_admin";
      payload: DeletePatientFromAdminPayload;
    }
  | {
      type: "submit_patient";
      payload: SubmitPatientPayload;
    };
