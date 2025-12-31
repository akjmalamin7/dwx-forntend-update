import type { ADMIN_COMPLETED_PATIENTS_MODEL } from "@/shared/redux/features/admin/completed-patients/completedPatients.types";
import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
import type { AGENT_PENDING_PATIENT_MODEL } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientList.types";
interface Doctor {
  _id: string;
  email: string;
  id?: string;
}
export type WSMessage =
  | { type: "update_patient"; payload: ADMIN_PENDING_PATIENT_MODEL }
  | {
      type: "new_xray_report";
      payload: ADMIN_PENDING_PATIENT_MODEL;
    }
  | {
      type: "new_ecg_report";
      payload: ADMIN_PENDING_PATIENT_MODEL;
    }
  | {
      type: "submit_patient";
      payload: ADMIN_COMPLETED_PATIENTS_MODEL;
    }
  | {
      type: "view_online_doctor";
      payload: ADMIN_PENDING_PATIENT_MODEL & { online_dr: Doctor };
    }
  | { type: "back_view_patient"; payload: ADMIN_PENDING_PATIENT_MODEL }
  | {
      type: "update_print_status";
      payload: ADMIN_PENDING_PATIENT_MODEL | ADMIN_COMPLETED_PATIENTS_MODEL;
    }
  | { type: "patient_deleted"; payload: { _id: string } }
  | { type: "delete_patient"; payload: { _id: string } }
  | { type: "completed_back"; payload: { _id: string } }
  | { type: "admin_mr_delete_back"; payload: { _id: string } }
  | { type: "select_doctor_and_update"; payload: AGENT_PENDING_PATIENT_MODEL };
