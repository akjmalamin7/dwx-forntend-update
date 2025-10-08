import Layout from "@/shared/layout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRouters";
import PublicRoutes from "./PublicRouters";
const LazyLogin = lazy(() => import("@/pages/login"));
const LazyPatients = lazy(() => import("@/pages/patients"));
export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<h4>Loadding...</h4>}>
        <PublicRoutes />
      </Suspense>
    ),
    children: [
      { path: "/login", element: <LazyLogin /> },
      { path: "*", element: <h1>Not found</h1> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<h4>Loadding...</h4>}>
                <LazyPatients />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
