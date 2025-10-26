import { Pages } from "@/app/router/lazy-pages";
import { withSuspense } from "@/shared/ui";

export const agentRoutes = [
  {
    path: "/agent/patient/add",
    element: withSuspense(<Pages.AddPatient />),
  },
  {
    path: "/agent/patient-edit/:id",
    element: withSuspense(<Pages.EditPatient />),
  },
  {
    path: "/agent/patient-print/:id",
    element: withSuspense(<Pages.PrintPatient />),
  },
  {
    path: "/agent/patient",
    element: withSuspense(<Pages.Patients />),
  },
  {
    path: "/agent/patient/quick-add",
    element: withSuspense(<Pages.QuickAddPatient />),
  },
  {
    path: "/upload",
    element: withSuspense(<h1>Upload</h1>),
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
    path: "/agent/reference-list/:id",
    element: withSuspense(<Pages.AgentReferenceEdit />),
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
    path: "/agent/checked-user-list/:id",
    element: withSuspense(<Pages.AgentCheckedUserEdit />),
  },
  {
    path: "/agent/checked-user-list",
    element: withSuspense(<Pages.AgentCheckedUserList />),
  },
  {
    path: "/agent/manage-bill",
    element: withSuspense(<Pages.AgentManageBill />),
  },
  {
    path: "/agent/pay-bill",
    element: withSuspense(<Pages.AgentPayBill />),
  },
  {
    path: "/agent/print-bill",
    element: withSuspense(<Pages.AgentPrintBill />),
  },
  {
    path: "/agent/transection-history",
    element: withSuspense(<Pages.AgentTransectionHistory />),
  },
  {
    path: "/agent/patient-view/:patient_id",
    element: withSuspense(<Pages.ViewPatient />),
  },
];
