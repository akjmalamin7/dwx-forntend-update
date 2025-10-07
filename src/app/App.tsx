import { useAuthCheck, useJWT } from "@/shared/hooks";
import { Loader } from "@/shared/ui";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const App = () => {
  const authChecked = useAuthCheck();
  const decoded = useJWT();

  if (!authChecked) return <Loader type="full_width" />;

  console.log("Decoded JWT:", decoded);

  return (
    <Suspense fallback={<Loader type="full_width" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default App;
