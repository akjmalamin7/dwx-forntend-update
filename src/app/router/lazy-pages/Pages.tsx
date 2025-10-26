import { lazy } from "react";

export const Pages = {
  Login: lazy(() => import("@/pages/login")),
  Unauthorized: lazy(() => import("@/pages/unauthorized")),
  Patients: lazy(() => import("@/pages/patients")),
  ViewPatient: lazy(() => import("@/pages/agent/patient-view")),
  AddPatient: lazy(() => import("@/pages/agent/patient-add")),
  EditPatient: lazy(() => import("@/pages/agent/patient-edit")),
  PrintPatient: lazy(() => import("@/pages/agent/patient-print")),

  QuickAddPatient: lazy(() => import("@/pages/agent/patient-quick-add")),
  AgentCompleted: lazy(() => import("@/pages/agent/patient-completed")),
  AgentAllCompleted: lazy(() => import("@/pages/agent/patient-all-completed")),
  AgentPreviousMonthCompleted: lazy(
    () => import("@/pages/agent/previous-month-patient")
  ),
  AgentPatientView: lazy(() => import("@/pages/agent/patient-view")),
  AgentPatientPrint: lazy(() => import("@/pages/agent/patient-print")),
  AgentDoctor: lazy(() => import("@/pages/agent/doctor-list")),
  AgentCheckedUserAdd: lazy(() => import("@/pages/agent/checked-user-add")),
  AgentCheckedUserEdit: lazy(() => import("@/pages/agent/checked-user-edit")),
  AgentCheckedUserList: lazy(() => import("@/pages/agent/checked-user-list")),
  AgentReferenceAdd: lazy(() => import("@/pages/agent/reference-add")),
  AgentReferenceEdit: lazy(() => import("@/pages/agent/reference-edit")),
  AgentReferenceList: lazy(() => import("@/pages/agent/reference-list")),
  AgentManageBill: lazy(() => import("@/pages/agent/manage-bill")),
  AgentPayBill: lazy(() => import("@/pages/agent/pay-bill")),
  AgentPrintBill: lazy(() => import("@/pages/agent/bill-print")),
  AgentTransectionHistory: lazy(
    () => import("@/pages/agent/transection-history")
  ),
  // doctor
  DoctorPendingPatient: lazy(() => import("@/pages/doctor/patient-pending")),
  DoctorViewPatient: lazy(() => import("@/pages/doctor/patient-view")),
  DoctorCompletedPatient: lazy(
    () => import("@/pages/doctor/patient-completed")
  ),
  DoctorAllCompletedPatient: lazy(
    () => import("@/pages/doctor/patient-all-completed")
  ),
  DoctorCompletedPatientView: lazy(
    () => import("@/pages/doctor/completed-patient-view")
  ),
  DoctorFormatList: lazy(() => import("@/pages/doctor/format-list")),
  DoctorFormatAdd: lazy(() => import("@/pages/doctor/format-add")),
  DoctorFormatUpdate: lazy(() => import("@/pages/doctor/update-format")),

  AdminPendingPatient: lazy(() => import("@/pages/admin/patient-pending")),
  AdminCompletedPatient: lazy(() => import("@/pages/admin/completed-patient")),
  AdminTodayCompletedPatient: lazy(
    () => import("@/pages/admin/today-completed-patient")
  ),
  AdminTodaySummery: lazy(() => import("@/pages/admin/today-summary")),
  AdminMonthlyCompleted: lazy(() => import("@/pages/admin/monthly-completed")),
  AdminDeletedPatient: lazy(() => import("@/pages/admin/deleted-patient")),
  AdminUpdateDoctor: lazy(() => import("@/pages/admin/update-doctor")),
  AdminViewPatient: lazy(() => import("@/pages/admin/patient-view")),
  AdminSelectDoctor: lazy(() => import("@/pages/admin/select-doctor")),
  AdminDoctorBill: lazy(() => import("@/pages/admin/doctor-update-month")),
  AdminDoctorPrintBill: lazy(() => import("@/pages/admin/doctor-print-bill")),
  AdminDoctorPayBill: lazy(() => import("@/pages/admin/doctor-pay-bill")),
  AdminDoctorUpdateBill: lazy(() => import("@/pages/admin/doctor-update-bill")),
};
