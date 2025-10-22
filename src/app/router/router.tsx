import { agentRoutes } from "@/pages/agent/agenRoutes";
import { doctorRoutes } from "@/pages/doctor/doctorRoutes";
import { withSuspense } from "@/shared/ui";
import Layout from "@/widgets/layout";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./lazy-pages";
import PrivateRoutes from "./private-routers/PrivateRouters";
import PublicRoutes from "./public-routers/PublicRouters";
import RoleBasedHome from "./role-base-home/roleBaseHome";
import { adminRoutes } from "@/pages/admin/adminRoutes";

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
      element: (
        <PrivateRoutes allowedRoles={["user", "admin", "xray_dr", "ecg_dr"]} />
      ),

      children: [
        { path: "/", element: withSuspense(<RoleBasedHome />) },
        {
          path: "/unauthorized",
          element: withSuspense(<Pages.Unauthorized />),
        },
        { path: "/profile", element: withSuspense(<h1>User Profile</h1>) },
        { path: "/settings", element: withSuspense(<h1>Settings</h1>) },
      ],
    },

    {
      element: <PrivateRoutes allowedRoles={["user"]} />,
      children: [...agentRoutes],
    },

    {
      element: <PrivateRoutes allowedRoles={["ecg_dr", "xray_dr"]} />,
      children: [...doctorRoutes],
    },

    {
      element: <PrivateRoutes allowedRoles={["admin"]} />,
      children: [...adminRoutes], 
    },
  ],
};

export const router = createBrowserRouter([publicRoutes, privateRoutes]);
