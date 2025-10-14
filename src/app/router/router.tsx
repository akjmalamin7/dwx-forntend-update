import Layout from "@/widgets/layout";
import { createBrowserRouter } from "react-router-dom";
import { Pages } from "./lazy-pages";
import PrivateRoutes from "./private-routers/PrivateRouters";
import PublicRoutes from "./public-routers/PublicRouters";
import { userRoutes } from "./routers/routers";
import { withSuspense } from "./with-suspense/withSuspense";

const publicRoutes = {
  element: withSuspense(<PublicRoutes />),
  children: [
    { path: "/login", element: <Pages.Login /> },
    { path: "*", element: <h1>Not Found</h1> },
  ]
}


const privateRoutes = {
  path: "/",
  element: <Layout />,
  errorElement: <h1>Something went wrong</h1>,
  children: [
    {
      element: <PrivateRoutes />,
      children: userRoutes,
    },
  ],
};

export const router = createBrowserRouter([publicRoutes, privateRoutes]);
