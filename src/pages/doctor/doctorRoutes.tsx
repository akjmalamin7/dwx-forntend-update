import { withSuspense } from "@/shared/ui";
import { Pages } from "@/widgets";

export const doctorRoutes = [
  {
    path: "/doctor/patient",
    element: withSuspense(<Pages.DoctorPendingPatient />),
  },
  {
    path: "/doctor/patient-view/:patient_id",
    element: withSuspense(<Pages.DoctorViewPatient />),
  },
  {
    path: "/doctor/patient-completed",
    element: withSuspense(<Pages.DoctorCompletedPatient />),
  },
  {
    path: "/doctor/patient-all-completed",
    element: withSuspense(<Pages.DoctorAllCompletedPatient />),
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
