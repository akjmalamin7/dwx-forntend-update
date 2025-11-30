import { lazy } from "react";

export const Pages = {
  Login: lazy(() => import("@/pages/login")),
  Unauthorized: lazy(() => import("@/pages/unauthorized")),
  Patients: lazy(() => import("@/pages/patients")),
  ViewPatient: lazy(() => import("@/pages/agent/patient-view")),
  SendReport: lazy(() => import("@/pages/agent/send-report")),
  EditSendReport: lazy(() => import("@/pages/agent/edit-send-report")),
  PrintPatient: lazy(() => import("@/pages/agent/patient-print")),

  QuickSendReport: lazy(() => import("@/pages/agent/quick-send-report")),
  AgentCompleted: lazy(() => import("@/pages/agent/patient-completed")),
  AgentThisMonthReports: lazy(() => import("@/pages/agent/this-month-reports")),
  AgentPreviousMonthReports: lazy(
    () => import("@/pages/agent/previous-month-reports")
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
    () => import("@/pages/doctor/all-completed-patients")
  ),
  DoctorCompletedPatientView: lazy(
    () => import("@/pages/doctor/completed-patient-view")
  ),
  DoctorFormatList: lazy(() => import("@/pages/doctor/format-list")),
  DoctorFormatAdd: lazy(() => import("@/pages/doctor/format-add")),
  DoctorFormatUpdate: lazy(() => import("@/pages/doctor/update-format")),

  AdminPendingPatient: lazy(() => import("@/pages/admin/patient-pending")),
  AdminCompletedPatients: lazy(
    () => import("@/pages/admin/completed-patients")
  ),
  AdminTodayCompletedPatient: lazy(
    () => import("@/pages/admin/today-completed-patient")
  ),
  AdminTodaySummery: lazy(() => import("@/pages/admin/today-summary")),
  AdminMonthlyCompleted: lazy(() => import("@/pages/admin/monthly-completed")),
  AdminDeletedPatient: lazy(() => import("@/pages/admin/deleted-patient")),
  AdminDoctorList: lazy(() => import("@/pages/admin/doctor-list")),
  AdminViewPatient: lazy(() => import("@/pages/admin/patient-view")),
  AdminCompletedPatientView: lazy(
    () => import("@/pages/admin/completed-patient-view")
  ),
  AdminSelectDoctor: lazy(() => import("@/pages/admin/select-doctor")),
  AdminPatientArchive: lazy(() => import("@/pages/admin/patient-archive")),
  AdminDoctorBill: lazy(() => import("@/pages/admin/doctor-update-month")),
  AdminDoctorPrintBill: lazy(() => import("@/pages/admin/doctor-print-bill")),
  AdminDoctorPayBill: lazy(() => import("@/pages/admin/doctor-pay-bill")),
  AdminDoctorUpdateBill: lazy(() => import("@/pages/admin/doctor-update-bill")),
  AdminManageCustomerBill: lazy(
    () => import("@/pages/admin/manage-customer-bill")
  ),
  AdminManageCustomerBillMonth: lazy(
    () => import("@/pages/admin/manage-customer-bill-by-month")
  ),
  AdminCustomerPrintBill: lazy(
    () => import("@/pages/admin/customer-print-bill")
  ),
  AdminCustomerPayBill: lazy(() => import("@/pages/admin/customer-pay-bill")),
  AdminCustomerUpdateBill: lazy(
    () => import("@/pages/admin/customer-bill-update")
  ),
  AdminCustomerBillMonth: lazy(
    () => import("@/pages/admin/customer-payment-request")
  ),
  AdminCustomerBillRequest: lazy(
    () => import("@/pages/admin/customer-bill-request-list")
  ),
  AdminCustomerBillList: lazy(
    () => import("@/pages/admin/customer-bill-list")
  ),
  AdminCustomerTransactionHistory: lazy(
    () => import("@/pages/admin/customer-transaction-history")
  ),
  AdminCustomerTransactionHistoryList: lazy(
    () => import("@/pages/admin/customer-transaction-history-list")
  ),
  AdminAddUser: lazy(() => import("@/pages/admin/add-user")),
  AdminEditUser: lazy(() => import("@/pages/admin/edit-user")),
  AdminChangePassword: lazy(() => import("@/pages/admin/change-password")),
  AdminCustomerList: lazy(() => import("@/pages/admin/users-list")),
  AdminXrayDoctorList: lazy(() => import("@/pages/admin/xray-doctors")),
  AdminEcgDoctorList: lazy(() => import("@/pages/admin/ecg-doctors")),
  AdminDeletedDoctorList: lazy(() => import("@/pages/admin/deleted-doctors")),
  AdminDeletedUserList: lazy(() => import("@/pages/admin/deleted-users")),
  AdminFormatList: lazy(() => import("@/pages/admin/format-list")),
  AdminFormatAdd: lazy(() => import("@/pages/admin/format-add")),
  AdminFormatUpdate: lazy(() => import("@/pages/admin/update-format")),
  AdminXraytypeList: lazy(() => import("@/pages/admin/xraytype-list")),
  AdminXraytypeAdd: lazy(() => import("@/pages/admin/xraytype-add")),
  AdminHistoryList: lazy(() => import("@/pages/admin/history-list")),
  AdminHistoryAdd: lazy(() => import("@/pages/admin/history-add")),
  AdminPaymentList: lazy(() => import("@/pages/admin/payment-list")),
  AdminPaymentAdd: lazy(() => import("@/pages/admin/payment-add")),
};
