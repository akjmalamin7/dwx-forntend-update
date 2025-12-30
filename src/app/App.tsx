import { useAuthCheck, usePageTitle } from "@/shared/hooks";
import { Loader } from "@/shared/ui";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const App = () => {
  const authChecked = useAuthCheck();
  usePageTitle("DWX", {
    suffix: "",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  if (!authChecked) return <Loader type="full_width" />;
  return (
    <Suspense fallback={<Loader type="full_width" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
