import { userRoutes } from "@/pages/agent/agenRoutes";
import { withSuspense } from "@/shared/ui";
import Layout from "@/widgets/layout";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./lazy-pages";
import PrivateRoutes from "./private-routers/PrivateRouters";
import PublicRoutes from "./public-routers/PublicRouters";

const publicRoutes = {
  element: withSuspense(<PublicRoutes />),
  children: [
    { path: "/login", element: <Pages.Login /> },
    { path: "*", element: <h1>Not Found</h1> },
  ],
};

const privateRoutes = {
  path: "/",
  element: <Layout />,
  errorElement: <h1>Something went wrong</h1>,
  children: [
    {
      element: <PrivateRoutes allowedRoles={["user", "admin"]} />,
      children: [...userRoutes],
    },
  ],
};

export const router = createBrowserRouter([publicRoutes, privateRoutes]);
