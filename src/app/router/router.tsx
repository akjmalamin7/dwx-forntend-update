import { Loader } from "@/shared/ui";
import Layout from "@/widgets/layout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRouters";
import PublicRoutes from "./PublicRouters";
const LazyLogin = lazy(() => import("@/pages/login"));
const LazyPatients = lazy(() => import("@/pages/patients"));
const LazyAddPatient = lazy(() => import("@/pages/agent/patient/add"));
const LazyQuickAddPatient = lazy(() => import("@/pages/agent/patient/quick-add"));
const LazyAgentCompleted = lazy(() => import("@/pages/agent/patient/completed"));
const LazyAgentAllCompleted = lazy(() => import("@/pages/agent/patient/all-completed"));
const LazyAgentDoctor= lazy(() => import("@/pages/agent/doctor"));
export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loader type="full_width" />}>
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
              <Suspense fallback={<Loader type="full_width" />}>
                <LazyPatients />
              </Suspense>
            ),
          },
          {
            path: "/agent/patient/add",
            element: (
              <Suspense fallback={<Loader type="full_width" />}>
                <LazyAddPatient />
              </Suspense>
            ),
          },
          {
            path: "/agent/patient/quick-add",
            element: (
              <Suspense fallback={<Loader type="full_width" />}>
                <LazyQuickAddPatient />
              </Suspense>
            ),
          },
          {
            path: "/agent/patient/completed",
            element: (
              <Suspense fallback={<Loader type="full_width" />}>
                <LazyAgentCompleted />
              </Suspense>
            ),
          },
          {
            path: "/agent/patient/all-completed",
            element: (
              <Suspense fallback={<Loader type="full_width" />}>
                <LazyAgentAllCompleted />
              </Suspense>
            ),
          },
          {
            path: "/agent/doctor",
            element: (
              <Suspense fallback={<Loader type="full_width" />}>
                <LazyAgentDoctor />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
