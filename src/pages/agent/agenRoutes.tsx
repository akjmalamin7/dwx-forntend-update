import { Pages } from "@/app/router/lazy-pages";
import { withSuspense } from "@/shared/ui";

export const userRoutes = [
  { path: "/", element: withSuspense(<Pages.Patients />) },
  { path: "/agent/patient/add", element: withSuspense(<Pages.AddPatient />) },
  { path: "/agent/patient/quick-add", element: withSuspense(<Pages.QuickAddPatient />) },
  { path: "/agent/patient/completed", element: withSuspense(<Pages.AgentCompleted />) },
  { path: "/agent/patient/all-completed", element: withSuspense(<Pages.AgentAllCompleted />) },
  { path: "/agent/patient/previous-month", element: withSuspense(<Pages.AgentPreviousMonthCompleted />) },
  { path: "/agent/patient-view", element: withSuspense(<Pages.AgentPatientView />) },
  { path: "/agent/patient-print", element: withSuspense(<Pages.AgentPatientPrint />) },
  { path: "/agent/doctor", element: withSuspense(<Pages.AgentDoctor />) },
  { path: "/agent/reference-list", element: withSuspense(<Pages.AgentReferenceList />) },
  { path: "/agent/reference-add", element: withSuspense(<Pages.AgentReferenceAdd />) },
  { path: "/agent/checked-user-add", element: withSuspense(<Pages.AgentCheckedUserAdd />) },
  { path: "/agent/checked-user-list", element: withSuspense(<Pages.AgentCheckedUserList />) },
  { path: "/agent/manage-bill", element: withSuspense(<Pages.AgentManageBill />) },
  { path: "/agent/pay-bill", element: withSuspense(<Pages.AgentPayBill />) },
  
];