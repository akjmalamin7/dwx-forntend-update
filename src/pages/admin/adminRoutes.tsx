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
    path: "/admin/completed-patient",
    element: withSuspense(<Pages.AdminCompletedPatient />),
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
    path: "/admin/update-doctor-bill",
    element: withSuspense(<Pages.AdminUpdateDoctor />),
  },
  
   {
    path: "/admin/patient-view/:patient_id",
    element: withSuspense(<Pages.AdminViewPatient />),
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

];
