import { withSuspense } from "@/shared/ui";
import Layout from "@/widgets/layout";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./lazy-pages";
import PrivateRoutes from "./private-routers/PrivateRouters";
import PublicRoutes from "./public-routers/PublicRouters";
import RoleBasedHome from "./roleBaseHome";

const publicRoutes = {
  element: withSuspense(<PublicRoutes />),
  children: [
    { path: "/login", element: <Pages.Login /> },
    { path: "/unauthorized", element: <Pages.Unauthorized /> },
    { path: "*", element: <h1>Not Found</h1> },
  ],
};

const privateRoutes = {
  path: "/",
  element: <Layout />,
  errorElement: <h1>Something went wrong</h1>,
  children: [
    {
      element: <PrivateRoutes allowedRoles={["user", "admin", "xray_dr", "ecg_dr"]} />,
      children: [
        { path: "/", element: withSuspense(<RoleBasedHome />) },
        { path: "/unauthorized", element: withSuspense(<Pages.Unauthorized />) },
        { path: "/profile", element: withSuspense(<h1>User Profile</h1>) },
        { path: "/settings", element: withSuspense(<h1>Settings</h1>) },
      ]
    },

    {
      element: <PrivateRoutes allowedRoles={["user"]} />,
      children: [
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
        { path: "/agent/print-bill", element: withSuspense(<Pages.AgentPrintBill />) },
        { path: "/agent/transection-history", element: withSuspense(<Pages.AgentTransectionHistory />) },
        { path: "/agent/patient-view/:patient_id", element: withSuspense(<Pages.ViewPatient />) },
      ]
    },

    {
      element: <PrivateRoutes allowedRoles={["ecg_dr"]} />,
      children: [
        { path: "/ecg-doctor/dashboard", element: withSuspense(<h1>ECG Doctor Dashboard</h1>) },
      ]
    },

    {
      element: <PrivateRoutes allowedRoles={["xray_dr"]} />,
      children: [
        { path: "/xray-doctor/dashboard", element: withSuspense(<h1>X-Ray Doctor Dashboard</h1>) },
      ]
    },

    {
      element: <PrivateRoutes allowedRoles={["admin"]} />,
      children: [
        { path: "/admin/users", element: withSuspense(<h1>User Management</h1>) },
        { path: "/admin/reports", element: withSuspense(<h1>Reports</h1>) },
      ]
    },

    {
      element: <PrivateRoutes allowedRoles={["ecg_dr", "xray_dr"]} />,
      children: [
        { path: "/doctor/patient", element: withSuspense(<Pages.DoctorPendingPatient />) },
        { path: "/doctor/patient-view/:patient_id", element: withSuspense(<Pages.DoctorViewPatient />) },
      ]
    },
  ],
};

export const router = createBrowserRouter([publicRoutes, privateRoutes]);