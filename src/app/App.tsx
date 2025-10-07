import { useJWT } from "@/shared/hooks/decode-token/useJWT";
import useAuthCheck from "@/shared/hooks/useAuthChecked";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

const App = () => {
  const authChecked = useAuthCheck();
  const decoded = useJWT();

  if (!authChecked) return <div>Checking authentication...</div>;

  console.log("Decoded JWT:", decoded);

  return <RouterProvider router={router} />;
};
export default App;
