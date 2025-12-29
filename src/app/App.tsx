import { useAuthCheck, usePageTitle } from "@/shared/hooks";
import { Loader } from "@/shared/ui";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

import { useAppDispatch } from "@/shared/hooks/use-dispatch/useAppDispatch";
import { useEffect } from "react";
const App = () => {
  const authChecked = useAuthCheck();
  usePageTitle("DWX", {
    suffix: "",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "socket/connect" });
  }, [dispatch]);


  if (!authChecked) return <Loader type="full_width" />;
  return (
    <Suspense fallback={<Loader type="full_width" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
