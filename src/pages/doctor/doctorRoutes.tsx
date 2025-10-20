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
];
