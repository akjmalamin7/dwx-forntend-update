import { Pages } from "@/app/router/lazy-pages";
import { withSuspense } from "@/shared/ui";

export const agentRoutes = [
  {
    path: "/agent/patient/send-xray-report",
    element: withSuspense(<Pages.SendXrayReport />),
  },
  {
    path: "/agent/patient/send-ecg-report",
    element: withSuspense(<Pages.SendEcgReport />),
  },
  {
    path: "/agent/patient-edit/:id",
    element: withSuspense(<Pages.EditSendReport />),
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
    element: withSuspense(<Pages.QuickSendReport />),
  },
  {
    path: "https://www.dwxviewer.site/upload",
    element: withSuspense(<h1>Upload</h1>),
  },
  {
    path: "/agent/patient/completed",
    element: withSuspense(<Pages.AgentCompleted />),
  },
  {
    path: "/agent/patient/this-month-reports",
    element: withSuspense(<Pages.AgentThisMonthReports />),
  },
  {
    path: "/agent/patient/previous-month-reports",
    element: withSuspense(<Pages.AgentPreviousMonthReports />),
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
    path: "/agent/pay-bill/:month",
    element: withSuspense(<Pages.AgentPayBill />),
  },
  {
    path: "/agent/print-bill/:month",
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
    {
    path: "/agent/software-list",
    element: withSuspense(<Pages.SoftwareList />),
  } 
];
