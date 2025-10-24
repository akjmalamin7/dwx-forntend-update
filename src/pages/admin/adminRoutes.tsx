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
    path: "/admin/today-summary",
    element: withSuspense(<Pages.AdminTodaySummery />),
  },
  {
    path: "/admin/monthly-completed",
    element: withSuspense(<Pages.AdminMonthlyCompleted />),
  },
 
    {
    path: "doctor/completed-patient-view/:patient_id",
    element: withSuspense(<Pages.DoctorCompletedPatientView />),
  },
    {
    path: "/doctor/format",
    element: withSuspense(<Pages.DoctorFormatList />),
  },
    {
    path: "/doctor/format-add",
    element: withSuspense(<Pages.DoctorFormatAdd />),
  },
];
