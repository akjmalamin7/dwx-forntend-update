import { withSuspense } from "@/shared/ui";
import { Pages } from "@/widgets";

export const adminRoutes = [
  {
    path: "/admin/patient",
    element: withSuspense(<Pages.AdminPendingPatient />),
  },
  {
    path: "/doctor/patient-view/:patient_id",
    element: withSuspense(<Pages.DoctorViewPatient />),
  },
  {
    path: "/admin/completed-patients",
    element: withSuspense(<Pages.AdminCompletedPatients />),
  },
  {
    path: "/admin/today-completed-patient",
    element: withSuspense(<Pages.AdminTodayCompletedPatient />),
  },
  {
    path: "/admin/today-summary",
    element: withSuspense(<Pages.AdminTodaySummery />),
  },
  {
    path: "/admin/monthly-completed",
    element: withSuspense(<Pages.AdminMonthlyCompleted />),
  },
  {
    path: "/admin/deleted-patient",
    element: withSuspense(<Pages.AdminDeletedPatient />),
  },

  {
    path: "/admin/doctor-list",
    element: withSuspense(<Pages.AdminDoctorList />),
  },

  {
    path: "/admin/patient-view/:patient_id",
    element: withSuspense(<Pages.AdminViewPatient />),
  },
  {
    path: "/admin/completed-patient-view/:patient_id",
    element: withSuspense(<Pages.AdminCompletedPatientView />),
  },
  {
    path: "/admin/patient-archive/:month",
    element: withSuspense(<Pages.AdminPatientArchive />),
  },
  {
    path: "/admin/doctor-bill-month/:doctor_id",
    element: withSuspense(<Pages.AdminDoctorBill />),
  },
  {
    path: "/admin/select-doctor/:patient_id",
    element: withSuspense(<Pages.AdminSelectDoctor />),
  },
  {
    path: "/admin/doctor-print-bill/:bill_id",
    element: withSuspense(<Pages.AdminDoctorPrintBill />),
  },
  {
    path: "/admin/doctor-pay-bill/:bill_id",
    element: withSuspense(<Pages.AdminDoctorPayBill />),
  },

  {
    path: "/admin/doctor-update-bill",
    element: withSuspense(<Pages.AdminDoctorUpdateBill />),
  },
  {
    path: "/admin/manage-customer-bill",
    element: withSuspense(<Pages.AdminManageCustomerBill />),
  },
  {
    path: "/admin/manage-customer-bill-month/:user_id",
    element: withSuspense(<Pages.AdminManageCustomerBillMonth />),
  },
  {
    path: "/admin/customer-print-bill/:bill_id",
    element: withSuspense(<Pages.AdminCustomerPrintBill />),
  },
  {
    path: "/admin/customer-pay-bill/:bill_id",
    element: withSuspense(<Pages.AdminCustomerPayBill />),
  },
  {
    path: "/admin/customer-update-bill",
    element: withSuspense(<Pages.AdminCustomerUpdateBill />),
  },
  {
    path: "/admin/customer-payment-request",
    element: withSuspense(<Pages.AdminCustomerBillMonth />),
  },
  {
    path: "/admin/customer-bill-request/:month",
    element: withSuspense(<Pages.AdminCustomerBillRequest />),
  },
  {
    path: "/admin/customer-transection-history",
    element: withSuspense(<Pages.AdminCustomerTransactionHistory />),
  },
  {
    path: "/admin/customer-transection-history/:month",
    element: withSuspense(<Pages.AdminCustomerTransactionHistoryList />),
  },
  {
    path: "/admin/add-user",
    element: withSuspense(<Pages.AdminAddUser />),
  },
  {
    path: "/admin/user/:id",
    element: withSuspense(<Pages.AdminEditUser />),
  },
  {
    path: "/admin/user-list",
    element: withSuspense(<Pages.AdminCustomerList />),
  },
  {
    path: "/admin/change-password/:id",
    element: withSuspense(<Pages.AdminChangePassword />),
  },

  {
    path: "/admin/xray-doctor-list",
    element: withSuspense(<Pages.AdminXrayDoctorList />),
  },
  {
    path: "/admin/ecg-doctor-list",
    element: withSuspense(<Pages.AdminEcgDoctorList />),
  },
  {
    path: "/admin/deleted-doctors",
    element: withSuspense(<Pages.AdminDeletedDoctorList />),
  },
  {
    path: "/admin/deleted-users",
    element: withSuspense(<Pages.AdminDeletedUserList />),
  },
  {
    path: "/admin/formats",
    element: withSuspense(<Pages.AdminFormatList />),
  },
  {
    path: "/admin/format-add",
    element: withSuspense(<Pages.AdminFormatAdd />),
  },
  {
    path: "/admin/format/:id",
    element: withSuspense(<Pages.AdminFormatUpdate />),
  },

  {
    path: "/admin/xraytype-list",
    element: withSuspense(<Pages.AdminXraytypeList />),
  },
  {
    path: "/admin/xraytype-add",
    element: withSuspense(<Pages.AdminXraytypeAdd />),
  },

  {
    path: "/admin/history-list",
    element: withSuspense(<Pages.AdminHistoryList />),
  },
  {
    path: "/admin/history-add",
    element: withSuspense(<Pages.AdminHistoryAdd />),
  },

  {
    path: "/admin/payment-list",
    element: withSuspense(<Pages.AdminPaymentList />),
  },
  {
    path: "/admin/payment-add",
    element: withSuspense(<Pages.AdminPaymentAdd />),
  },
];
