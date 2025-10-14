import { Pages } from "../lazy-pages";
import { withSuspense } from "../with-suspense/withSuspense";

export const userRoutes = [
  { path: "/", element: withSuspense(<Pages.Patients />) },
  { path: "/agent/patient/add", element: withSuspense(<Pages.AddPatient />) },
  { path: "/agent/patient/quick-add", element: withSuspense(<Pages.QuickAddPatient />) },
  { path: "/agent/patient/completed", element: withSuspense(<Pages.AgentCompleted />) },
  { path: "/agent/patient/all-completed", element: withSuspense(<Pages.AgentAllCompleted />) },
  { path: "/agent/doctor", element: withSuspense(<Pages.AgentDoctor />) },
  { path: "/agent/reference-list", element: withSuspense(<Pages.AgentReferenceList />) },
  { path: "/agent/reference-add", element: withSuspense(<Pages.AgentReferenceAdd />) },
  { path: "/agent/checked-user-add", element: withSuspense(<Pages.AgentCheckedUserAdd />) },
  { path: "/agent/checked-user-list", element: withSuspense(<Pages.AgentCheckedUserList />) },
];

export const adminRoutes = [
  { path: "/", element: <h1>Admin Dashboard</h1> },
  { path: "/admin/users", element: <h1>Manage Users</h1> },
  { path: "/admin/settings", element: <h1>Settings</h1> },
];
