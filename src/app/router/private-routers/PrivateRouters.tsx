import { useAuth } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuthenticate } = useAuth();
  return isAuthenticate === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
