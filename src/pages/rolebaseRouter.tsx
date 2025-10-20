// pages/rolebaseRouter.tsx
import { withSuspense } from "@/shared/ui";
import { Pages } from "@/widgets";

export const userRoutes = [
  { path: "/", element: withSuspense(<Pages.Patients />) },
  { path: "/unauthorized", element: withSuspense(<Pages.Unauthorized />) },
  {
    path: "/agent/patient-view/:patient_id",
    element: withSuspense(<Pages.ViewPatient />),
  },
  { path: "/agent/patient/add", element: withSuspense(<Pages.AddPatient />) },
  {
    path: "/agent/patient/quick-add",
    element: withSuspense(<Pages.QuickAddPatient />),
  },
  {
    path: "/agent/patient/completed",
    element: withSuspense(<Pages.AgentCompleted />),
  },
  {
    path: "/agent/patient/all-completed",
    element: withSuspense(<Pages.AgentAllCompleted />),
  },
  {
    path: "/agent/patient/previous-month",
    element: withSuspense(<Pages.AgentPreviousMonthCompleted />),
  },
  {
    path: "/agent/patient-view",
    element: withSuspense(<Pages.AgentPatientView />),
  },
  {
    path: "/agent/patient-print",
    element: withSuspense(<Pages.AgentPatientPrint />),
  },
  { path: "/agent/doctor", element: withSuspense(<Pages.AgentDoctor />) },
  {
    path: "/agent/reference-list",
    element: withSuspense(<Pages.AgentReferenceList />),
  },
  {
    path: "/agent/reference-add",
    element: withSuspense(<Pages.AgentReferenceAdd />),
  },
  {
    path: "/agent/checked-user-add",
    element: withSuspense(<Pages.AgentCheckedUserAdd />),
  },
  {
    path: "/agent/checked-user-list",
    element: withSuspense(<Pages.AgentCheckedUserList />),
  },
  {
    path: "/agent/manage-bill",
    element: withSuspense(<Pages.AgentManageBill />),
  },
  { path: "/agent/pay-bill", element: withSuspense(<Pages.AgentPayBill />) },
  {
    path: "/agent/print-bill",
    element: withSuspense(<Pages.AgentPrintBill />),
  },
  {
    path: "/agent/transection-history",
    element: withSuspense(<Pages.AgentTransectionHistory />),
  },
];

export const drDrRoutes = [
  {
    path: "/",
    element: withSuspense(<Pages.DoctorPendingPatient />),
  },
  {
    path: "/doctor/patient-view/:patient_id",
    element: withSuspense(<Pages.DoctorViewPatient />),
  },
  { path: "/unauthorized", element: withSuspense(<Pages.Unauthorized />) },
];

export const adminRoutes = [
  { path: "/", element: withSuspense(<h1>Home for admin</h1>) },
  { path: "/unauthorized", element: withSuspense(<Pages.Unauthorized />) },
];

export const getRoutesByRole = (role: string) => {
  switch (role) {
    case 'admin':
      return adminRoutes;
    case 'ecg_dr':
      return drDrRoutes;
    case 'xray_dr':
      return drDrRoutes;
    case 'user':
      return userRoutes;
    default:
      return userRoutes;
  }
};