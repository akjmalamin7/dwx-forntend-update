import type { ADMIN_ARCHIVE_DOCTOR_MODEL } from "@/entities/admin/patient-archive/model/schema";
import type { ADMIN_DELETED_PATIENT_MODEL } from "@/shared/redux/features/admin/deleted-patient/deletedPatientList.types";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import type { PATIENT_VIEW_MODEL } from "../../admin-patient-view/model/schema";

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
    id: string;
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
  // patient: Partial<ADMIN_PENDING_PATIENT_MODEL>;
  patient: PATIENT_VIEW_MODEL;
};
export type SelectDoctorAndUPdate = {
  message: string;
  success: boolean;
  patient: ADMIN_PENDING_PATIENT_MODEL;
};
export type CompletedDoctorReport = {
  message: string;
  success: boolean;
  patient: PATIENT_VIEW_MODEL;
};

export type AdmincompletedBack = {
  patient: ADMIN_ARCHIVE_DOCTOR_MODEL;
};
export type AdminMrDeleteBack = {
  patient: ADMIN_DELETED_PATIENT_MODEL;
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
    }
  | {
      type: "select_doctor_and_update";
      payload: SelectDoctorAndUPdate;
    }
  | {
      type: "completed_back";
      payload: AdmincompletedBack;
    }
  | {
      type: "admin_mr_delete_back";
      payload: AdminMrDeleteBack;
    };
