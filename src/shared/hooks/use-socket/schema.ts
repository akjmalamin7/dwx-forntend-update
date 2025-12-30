import type { ADMIN_PENDING_PATIENT_MODEL } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientList.types";
interface Doctor {
  _id: string;
  email: string;
  id?: string;
}
export type WSMessage =
  | { type: "new_xray_report"; payload: ADMIN_PENDING_PATIENT_MODEL }
  | { type: "update_patient"; payload: ADMIN_PENDING_PATIENT_MODEL }
  | { type: "submit_patient"; payload: ADMIN_PENDING_PATIENT_MODEL }
  | {
      type: "view_online_doctor";
      payload: ADMIN_PENDING_PATIENT_MODEL & { online_dr: Doctor };
    }
  | { type: "back_view_patient"; payload: ADMIN_PENDING_PATIENT_MODEL }
  | { type: "patient_deleted"; payload: { _id: string } };
